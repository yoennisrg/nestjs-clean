import { Logger } from "@nestjs/common";
import { Publisher } from "../KafkaPlugin";
import { DTO } from "@shin/models";

interface  PublisherConfig{
    publisher : string,
    topicDlq:string;
    topicAlert:string;
    headers : any
    originName:string
    environment:string
}

export class AlertNotification {
    static config: PublisherConfig | null;

    static init(config:(PublisherConfig | any)):[(Error | any),(PublisherConfig | null)]{
        if(!this.config && !config) return [new Error('Not config available'),null]
        if(!this.config){
            this.config = {
                ...config,
                headers:{
                    identifier:config.headers.name,
                    version: config.headers.versionMessage ?? 'v1.0.0',
                }
            }
        }
        return [null,this.config];
    }

    static async  toDeadLetterQueue({msg,value}:any):Promise<any>{
        const [error,config] = this.init(null)
        if(config){
            const publisher = new Publisher({
                topic: config.topicDlq,
                identifier: config.publisher,
              });
              await publisher.publishBatch([
                {
                    headers:config.headers,
                    value:value
                }
              ]);
              console.debug(`${config.originName} ${msg} message send to ${config.topicDlq}`);
        }
        
        }

   static async onFail({msg,value}:any):Promise<any> {
        const [error,config] = this.init(null);
        if(config){
            await this.toDeadLetterQueue({msg,value})
            await this.notify({
                artifactName: config.originName,
                environment:config.environment,
                type: 'FAILED',
                payload: [{ name: msg, value: JSON.stringify(value) }],
              });
        }
        
    }

    static async notify(value: DTO.ALERT.IAlert): Promise<void> {
        const [error,config] = this.init(null);
        
        if(config){
            const {headers,topicAlert} = config
            const publisher = new Publisher({
                topic: config.topicAlert,
                identifier: config.publisher,
              });
            try {
                await publisher.publishBatch<DTO.ALERT.IAlert>([
                  {
                    headers,
                    value,
                  },
                ]);
              } catch (error) {
                Logger.error(`Could not send notification to topic ${topicAlert}`);
                Logger.debug(`Could not send notification to topic ${topicAlert}`, error);
              }
            }  
        }
        
        
    
}