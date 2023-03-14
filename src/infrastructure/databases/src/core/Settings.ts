import DevKit from '@team_seki/dev-kit';
import { has } from 'lodash';
import constants from '../constants';

export interface IElasticSettings {
  elasticsearch_username: string;
  elasticsearch_password: string;

  elasticsearch_cloud_id: string;
  elasticsearch_endpoint: string;
}

export interface IKafkaSettings {
  brokers: string;
  ssl: boolean;
  sasl_username: string;
  sasl_password: string;
}

export interface IMongoSettings {
  username?: string,
  password?: string,
  connection_string: string
}

export interface IRedisSettings {
  auth?: string,
  host: string,
  port: number
}

type ICloud = 'kafka' | 'redis' | 'mongodb' | 'elastic'

type ISettings = {
  type: 'kafka',
  options: IKafkaSettings
} | {
  type: 'redis',
  options: IRedisSettings
} | {
  type: 'mongodb',
  options: IMongoSettings
} | {
  type: 'elastic',
  options: IElasticSettings
}

type AnySettings = Record<string, any>;
type IConfig = Record<string,AnySettings>

class SettingManager {
    private _config: IConfig = {};

    get  = (identifier: string, kind: ICloud): AnySettings => {

      const id = `${identifier}_${kind}`

        if(has(this._config, id)) {
          return this._config[id]    
        }
        
        const components = DevKit.Cloud.Components.Get(kind, identifier);
        const settings = components.getOutput<AnySettings>(constants.SETTINGS_FILE_NAME);
        this.set(identifier, { type: kind, options: settings } as ISettings)
        return settings;
    }

    set = (identifier: string, config: ISettings): void => {
      const id = `${identifier}_${config.type}`
      this._config[id] = config.options 
    }
}

export default new SettingManager();