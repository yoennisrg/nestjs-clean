import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { Module, DynamicModule } from '@nestjs/common';
import { MongoDBPlugin } from '@team_seki/mongodb-plugin';
import SettingManager, { IMongoSettings } from './Settings'
import mongoose, { ConnectOptions, Mongoose } from 'mongoose';
import { LogCreator } from '@shin/utils';

const logger = new LogCreator('MongoClient');

interface OptionsInstance {
  strictQuery?: boolean;
  keepAlive?: boolean;
}

@Module({
  providers: [],
  exports: [],
})
export class MongoModule {
  public static forRoot(identifier?: string, databaseName?: string): DynamicModule {
    return {
      module: MongoModule,
      imports: [
        MongooseModule.forRootAsync({
          imports: [ MongoModule ],
          useFactory: () => {
           const settings = SettingManager.get(identifier ?? 'default', 'mongodb') as IMongoSettings
            
            return <MongooseModuleOptions>{
              uri: settings.connection_string,
              user: settings.username,
              pass: settings.password,
              ...( databaseName && { dbName: databaseName })
              // useNewUrlParser: true,
              // useUnifiedTopology: true,
              // useFindAndModify: false,
            };
          },
        }),
      ],
    };
  }
}

class MongoClient {
  private instance?: Mongoose

  getClient = async (identifier: string, databaseName: string, options?: OptionsInstance): Promise<Mongoose> => {
    if(this.instance){
     return this.instance
    }

    return await new MongoDBPlugin({ identifier })
    .getClient({database: databaseName })
    .then((client) => {
      client.set('strictQuery', options?.strictQuery ?? false);
      
      if(options?.keepAlive){
         this.instance = client;
      }
     return client
    })
    .finally(()=> {
      logger.log(`MongoBb: ${databaseName} is ready with StrictQuery: ${options?.strictQuery ?? false}`);
    })
}

  getInstance = async (identifier: string, databaseName: string, options?: OptionsInstance) => {
    if(this.instance){
      return this.instance
    }
   
    const settings = SettingManager.get(identifier, 'mongodb') as IMongoSettings; 
    return await mongoose.connect(settings.connection_string, {
        dbName: databaseName,
        user: settings.username,
        pass: settings.password,
      })
      .then((client)=> {
        client.set('strictQuery', options?.strictQuery ?? false);
        
        if(options?.keepAlive){
          this.instance = client;
        }
        return client;
      })
      .finally(()=> {
        logger.log(`MongoBb: ${databaseName} is ready with StrictQuery: ${options?.strictQuery ?? false}`);
      })
  }
}

export default new MongoClient()