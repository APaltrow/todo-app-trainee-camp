import { connectMongoMemoryServer, disconnectMongoDB } from '@utils';

global.beforeAll(connectMongoMemoryServer);
global.afterAll(disconnectMongoDB);
