declare global {
	namespace NodeJS {
		interface ProcessEnv {
			botToken: string;
			MongoConnectionString: string;
			databaseName: string;
			activity: string;
			environment: 'dev' | 'prod' | 'debug';
		}
	}
}

export {};
