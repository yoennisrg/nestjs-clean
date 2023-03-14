import { DynamicModule } from "@nestjs/common";
import { LogCreator } from "@shin/utils";
import { RedisPlugin } from "@team_seki/redis-plugin";
import IORedis, { Redis, Command, RedisOptions } from "ioredis";
import { RedisModule as  RedisNestModule} from "./modules/RedisModule";
import SettingManager, { IRedisSettings } from "./Settings";

export type RedisInstance = Redis;
type ArgumentType = any;


const logger = new LogCreator("RedisClient");

class RedisModule {
	public static forRoot(identifier?: string, options?: Omit<RedisOptions, 'host'|'port'|'password'>): DynamicModule {
		return RedisNestModule.registerAsync({
		imports: [RedisModule],
	useFactory: () => {
		const settings = SettingManager.get(identifier ?? 'default', "redis") as IRedisSettings;

	    return {
		connectionOptions: {
			host: settings.host,
			port: settings.port,
			password: settings.auth,
			...options
		},
		ready: (client) => {
			client.on('connect', () => {
				logger.log(`Connected to redis on ${client.options.host}:${client.options.port}`);
			  });

			client.on("disconnect", () => {
				logger.log("disconnect");
			 });

			 client.on('error', (err) => {
				logger.error("An error has occurred tyring to connect to redis", err);
			});
		}
		}
	    }
		});
	}
}


class RedisClient {
	private instance?: RedisInstance;

	getClient = async (identifier?: string, keepAlive?: boolean): Promise<RedisInstance> => {
		return await new Promise((resolve, reject) => {
			if (this.instance && keepAlive) {
				resolve(this.instance)
			}
			const redis = new RedisPlugin({ identifier: identifier ?? 'default'}).client();
			redis.on("connect", () => {
				this.instance = redis;
				resolve(redis);
			});
			redis.on("disconnect", () => {
			   this.instance = undefined;
			});
			redis.on("error", (err) => {
				logger.error("An error has occurred tyring to connect to redis", err);
				reject(err);
			});
		});
	};

	getInstance = async ( identifier?: string, options?: RedisOptions & { keepAlive?: boolean }): Promise<RedisInstance> => {
		return await new Promise((resolve, reject) => {
			if (this.instance && options?.keepAlive) {
				resolve(this.instance);
			}
			try {
				const settings = SettingManager.get(identifier ?? 'default', "redis") as IRedisSettings;
				const redis = new IORedis({
					host: settings.host,
					port: settings.port,
					password: settings.auth,
					...options
				});
				redis.on("connect", () => {
					this.instance = redis;
					resolve(redis);
				});
				redis.on("disconnect", () => {
				   this.instance = undefined;
				});
				redis.on("error", (err) => {
					logger.error("An error has occurred tyring to connect to redis", err);
					reject(err);
				});

			} catch (error) {
				reject(error);
			}
		});
	};

	executeCommand = (command: string, args: ArgumentType[]): unknown => {
		if (!this.instance) {
			throw new Error("there is no redis connection instance, please connect");
		}
		try {
			const cmd = new Command(command, args, {}, function (err, value) {
				if (err) {
					throw err;
				}
				return value;
			});
			return this.instance.sendCommand(cmd);
		} catch (error) {
			logger.error(error);
			throw error;
		}
	};
}

export { RedisModule }

export default new RedisClient();