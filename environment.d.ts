declare global {
	namespace NodeJS {
		interface ProcessEnv {
			BOT_TOKEN: string;
			MONGO_TOKEN: string;
			DATABASE_NAME: string;
			ACTIVITY: string;
			environment: 'dev' | 'prod' | 'debug';
		}
	}
}

export {};
