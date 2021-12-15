import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { connectionString } from '../constants/connection';

@Module({
  providers: [],
  exports: [],
})
export class DatabaseModule {
  public static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        MongooseModule.forRootAsync({
          imports: [DatabaseModule],
          useFactory: () => {
            console.log(connectionString);
            return <MongooseModuleOptions>{
              uri: 'mongodb://localhost:27017/demo',
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useFindAndModify: false,
            };
          },
        }),
      ],
    };
  }
}
