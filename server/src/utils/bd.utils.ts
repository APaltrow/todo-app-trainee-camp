import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { DBEvents, DBLogMessages, LogMessages } from '@constants';

export const connectMongoDB = async (dbUri: string) => {
  mongoose.connection.on(DBEvents.ON_CONNECTED, () => {
    console.log(`${LogMessages.MONGO_BD} ${DBLogMessages.CONNECTED}`);
  });

  mongoose.connection.on(DBEvents.ON_ERROR, (error) => {
    console.log(`${LogMessages.MONGO_BD} ${DBLogMessages.ERROR}`, error);
  });

  mongoose.connection.on(DBEvents.ON_DISCONNECT, () => {
    console.log(`${LogMessages.MONGO_BD} ${DBLogMessages.DISCONNECT}`);
  });

  await mongoose.connect(dbUri);
};

export const disconnectMongoDB = async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
};

export const connectMongoMemoryServer = async () => {
  try {
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);

    console.log(DBLogMessages.MS_CONNECTED);
  } catch (error) {
    console.log(DBLogMessages.MS, error);
  }
};
