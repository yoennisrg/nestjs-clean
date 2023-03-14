import { randomUUID } from 'crypto';
import { Core } from '@team_seki/event-streamer-base';
import { PublisherFn, KafkaClient, createKafkaClient } from '@cencosud-x/cencosud-x-kafka-plugin';
import { SettingManager, Settings } from '@shin/databases';

interface IProps extends Core.Publisher.IPublisherProps {
  keepAlive?: boolean;
  artefactName?: string;
}

export type IHeaders = Partial<Core.Definitions.IHeader>
export interface IMsgToPublish<T> {
  key?: string | Buffer | null | undefined;
  value: T
  headers: IHeaders;
}
export class Publisher extends Core.Publisher.BasePublisher<IProps> {
  private client: KafkaClient;
  private kafkaPublish: PublisherFn | null = null;

  constructor(props: IProps) {
    super(props);

    const identifier = this.props.identifier ?? 'default'

    const settings = SettingManager.get(identifier, 'kafka') as Settings.IKafkaSettings;

    const brokers = settings.brokers;
    const ssl = settings.ssl ? true : false;
    const sasl_username = settings.sasl_username;
    const sasl_password = settings.sasl_password;

    this.client = createKafkaClient({
      clientId: this.props.artefactName ?? identifier,
      brokers,
      sasl: ssl ? { username: sasl_username, password: sasl_password } : undefined,
    });
  }

  private async getPublisher(): Promise<PublisherFn> {
    if (this.kafkaPublish == null) {
      this.kafkaPublish = await this.client.createPublisher(this.props.keepAlive ?? false);
    }

    return this.kafkaPublish;
  }

  
  async publish<T>(data: T, headers: IHeaders): Promise<void> {
    const contentType: Core.Definitions.IHeader['content_type'] =
      typeof data == 'string' && data.startsWith('<!doctype')
        ? 'text/html'
        : typeof data == 'string' && data.endsWith('>')
          ? 'application/xml'
          : typeof data == 'object'
            ? 'application/json'
            : 'application/unknown';

    const kafkaPublish = await this.getPublisher()
    await kafkaPublish(this.props.topic, {
      headers: {
        id: headers['id'] ?? randomUUID(),
        created_at: new Date().toISOString(),
        topic: this.props.topic,
        content_type: headers['content_type'] ?? contentType,
        source: this.props.identifier ?? 'unknown',
        version: headers['version'] ?? 'v1.0.0',
        ...Object.entries(headers)
          .filter(
            (tuple): tuple is [string, string | number | boolean] => typeof tuple[1] !== 'undefined'
          )
          .reduce((acc, [key, val]) => ({ ...acc, [key]: `${val}` }), {}),
      },
      value: JSON.stringify(data),
      key: headers.id,
    });
  }


  async publishBatch<T>(message: IMsgToPublish<T>[]): Promise<void> {

    const publish = await this.getPublisher()
    await publish(this.props.topic,
      message.map(({ value, headers, key }) => {
        const contentType: Core.Definitions.IHeader['content_type'] =
          typeof value == 'string' && value.startsWith('<!doctype')
            ? 'text/html'
            : typeof value == 'string' && value.endsWith('>')
              ? 'application/xml'
              : typeof value == 'object'
                ? 'application/json'
                : 'application/unknown';

        return {
          headers: {
            id: headers['id'] ?? randomUUID(),
            created_at: new Date().toISOString(),
            topic: this.props.topic,
            content_type: headers['content_type'] ?? contentType,
            source: this.props.identifier ?? 'unknown',
            version: headers['version'] ?? 'v1.0.0',
            ...Object.entries(headers)
              .filter(
                (tuple): tuple is [string, string | number | boolean] => typeof tuple[1] !== 'undefined'
              )
              .reduce((acc, [key, val]) => ({ ...acc, [key]: `${val}` }), {}),
          },
          value: JSON.stringify(value),
          key: key ?? headers.id,
        }
      }))
  }
}
