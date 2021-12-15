import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

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
            return <MongooseModuleOptions>{
              uri: process.env.DB_CONNECTION_PATH,
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
