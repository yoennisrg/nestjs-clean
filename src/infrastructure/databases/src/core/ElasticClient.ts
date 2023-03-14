import DevKit from '@team_seki/dev-kit';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { Client, ClientOptions } from "@elastic/elasticsearch"
import { ElasticPlugin } from '@team_seki/elastic-plugin';
import { LogCreator } from '@shin/utils';
import SettingManager, { IElasticSettings } from "./Settings";
import { DynamicModule } from '@nestjs/common';

type ElasticInstance = Client

const logger = new LogCreator("ElasticClient");

export class ElasticModule {
  public static forRoot(identifier?: string, options?: Omit<ClientOptions, 'auth'|'cloud'>): DynamicModule {
    return ElasticsearchModule.registerAsync({
          imports: [ElasticModule],
          useFactory: () => {
            const settings = SettingManager.get(identifier ?? 'default', 'elastic') as IElasticSettings

            const authConfig = {
              auth: {
                username: settings.elasticsearch_username,
                password: settings.elasticsearch_password
              }
            }

            if (DevKit.isLocal()) {
              return ({
                ...authConfig,
                ...options,
                node: settings.elasticsearch_endpoint
              })
            }
          
            return ({
                ...authConfig,
                ...options,
                cloud: {
                  id: settings.elasticsearch_cloud_id
                }
              })
          },
        })
  }
}




class ElasticClient {
    private instance?: ElasticInstance

    getClient = async (identifier?: string, options?: ClientOptions & { keepAlive?: boolean }): Promise<ElasticInstance> => {
		return await new Promise((resolve, reject) => {
			if (this.instance && (options?.keepAlive ?? false)) {
				resolve(this.instance)
			}

     try {
      const elastic = new ElasticPlugin({identifier: identifier ?? 'default', ...options});
      const client = elastic.getClient()
      this.instance = client;
      resolve(client)
      
     } catch (err) {
      logger.error(err)
      reject(err);
     }
    });

    }

    getInstance = async ( identifier?: string, options?: Omit<ClientOptions, 'auth'|'cloud'> & { keepAlive?: boolean }): Promise<ElasticInstance> => {
		return await new Promise((resolve, reject) => {
			if (this.instance && options?.keepAlive) {
				resolve(this.instance);
			}

			try {
            const settings = SettingManager.get(identifier ?? 'default', "elastic") as IElasticSettings;

        const authConfig = {
            auth: {
              username: settings.elasticsearch_username,
              password: settings.elasticsearch_password
            }
          }
        
          let client: ElasticInstance;

          if (DevKit.isLocal()) {
            client = new Client({
              ...authConfig,
              ...options,
              node: settings.elasticsearch_endpoint
            })

          } else {
            client = new Client({
              ...authConfig,
              ...options,
              cloud: {
                id: settings.elasticsearch_cloud_id
              }
            })
          }

          // if(!client) {
          //   reject(new Error('failed to create client instance'))
          // }
          
          //   client.on("sniff", (err, request) => {
          //       if (err) {
          //          logger.error(err)
          //       } else {
          //         logger.log("New nodes discovered:", request.body.nodes);
          //       }
          //     });

          //   client.on("close", (err) => {
          //       if (err) {
          //         logger.error(logger);
          //       } else {
          //         this.instance = undefined
          //         logger.log("Disconnected Elasticsearch client");
          //       }
          //     });

          //   client.on('response', (err: Error | null) => {
          //       if (err) {
          //         logger.error(err);
          //         reject(err)
          //       } else {
          //         logger.log('Client connected to Elasticsearch');
          //         resolve(client)
          //       }
          //     });

          //
          resolve(client); // si se descomenta el codigo de arriba se elimina esta linea
          
        } catch (error) {
            reject(error);
        }
    });

    }

 
}

export default new ElasticClient();