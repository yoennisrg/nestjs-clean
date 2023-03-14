import { ConsumerConfig } from 'kafkajs'
import { CacheHandler, ConsumerFn, createKafkaClient, KafkaClient, TopicConfig } from '@cencosud-x/cencosud-x-kafka-plugin';
import DevKit from '@team_seki/dev-kit';
import { Core } from '@team_seki/event-streamer-base';
import { SettingManager, Settings } from '@shin/databases';
import Message from './Message';

type PromiseRemap<P> = P extends Promise<infer T> ? T : never;
export type ConsumerBy = 'by_message' | 'by_batch'
export type AdvancedProps = Omit<ConsumerConfig, 'groupId'>

export interface IProps extends Core.Subscriber.IHandlerProps  {
  maxNumberOfFailures: number;
  maxTimeoutOnFailure?: number;
  deathLetterQueueTopic?: string;
  fromBeginning?: boolean;
  idempotentConsumingOptions?: {
    cacheHandler: CacheHandler;
    ttlSeconds: number;
    validateValue?: boolean;
    dieOnStoringFailure?: boolean;
  };
  kind?: ConsumerBy,
  advancedProps?: AdvancedProps;
  groupId: string;
}

export  class IHandler extends Core.Subscriber.IBaseHandler<IProps> {
  public client: KafkaClient;
  public consumer: PromiseRemap<ReturnType<ConsumerFn>> | undefined;

  constructor(props: IProps) {
    super(props);

    const settings = SettingManager.get(this.props.identifier ?? 'default', 'kafka') as Settings.IKafkaSettings;

    const brokers = settings.brokers;
    const ssl = settings.ssl  ? true : false;
    const sasl_username = settings.sasl_username;
    const sasl_password = settings.sasl_password;

    this.client = createKafkaClient({
      clientId: this.props.artifactName,
      brokers,
      sasl: ssl ? { username: sasl_username, password: sasl_password } : undefined,
    });

    this.client.onShutdown();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async onReady(): Promise<void> { }

  async boot(): Promise<void> {
    this.consumer = await this.client.createConsumer({
      ...this.props,
      groupId: this.props.groupId,
    });

    const listTopics = this.props.topic.split(',')

    if (DevKit.isLocal()) {
      try {
        const brokerTopics = await this.client.listTopics();
        const topicListToCreate = [];
        for (const topic of listTopics) {
          if(!brokerTopics.includes(topic)){
            topicListToCreate.push({topic, numPartitions: 3})
          }
        }
        if (topicListToCreate.length > 0){
          await this.client.createTopic(topicListToCreate, false);
        }
      } catch (error) {
        console.error('Error trying to create a kafka topic in local environment');
        console.debug({
          topic: this.props.topic,
          environment: 'local',
          error,
        });
      }
    }

    const createTopicConfig = (_kind: ConsumerBy = 'by_message', topic: string): TopicConfig => {
       switch (_kind) {
        case 'by_batch':
          return {
            topic,
            kind: 'by_batch',
            fromBeginning: this.props.fromBeginning ?? false,
            batchHandler: async (batch, sendToDLQ) => {
              return await Promise.resolve(batch)
              .then((batchMessage)=> Message.fromKafkaBatch(batchMessage))
              .then(async (msgOrError)=> {
                if(msgOrError.success){
                  try {
                    await this.handleMessage(msgOrError.data);
                  } catch (ex){
                    msgOrError = { success: false, error: ex as Error };
                  }
                }
                return msgOrError
              })
              .then(async (msgOrError)=> {
                if (!msgOrError.success) {
                  if (this.props.deathLetterQueueTopic)
                    await sendToDLQ(batch.messages, { code: 'parsing_failure', details: '' });
                  else
                    console.debug(
                      `Failed to parse kafka batch at [${batch.partition}:${batch.firstOffset()}:${batch.lastOffset()}] to IMessage, ignoring`
                    );
                  return;
                }
              })
              .then(()=> batch.lastOffset())
            },
          }
        default:
          return {
            topic,
            kind: 'by_message',
            fromBeginning: this.props.fromBeginning ?? false,
            messageHandler: async (msg, sendToDql) => {
              const msgOrError: any = Message.fromKafkaMessage(msg);
              if (!msgOrError.success) {
                if (this.props.deathLetterQueueTopic)
                  await sendToDql(msg, { code: 'parsing_failure', details: msgOrError.error.message });
                else
                  console.debug(
                    `Failed to parse kafka msg at [${msg.partition}:${msg.offset}] to IMessage, ignoring`
                  );
                return;
              }
      
              await this.handleMessage(msgOrError.data);
            },
          }
       }
    }

    await this.consumer.subscribe(listTopics.map(t => (createTopicConfig(this.props.kind, t))));  
  }

  async handleMessage(message: Core.Definitions.IMessage): Promise<void> {
    console.log(JSON.stringify(message, null, 2));
  }

  async close(): Promise<void> {
    await this.client.onShutdown();
  }
}
