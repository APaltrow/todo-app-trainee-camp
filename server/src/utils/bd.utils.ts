import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { LogMessages } from '@constants';

export const connectMongoDB = async (dbUri: string) => {
  mongoose.connection.on('connected', () => {
    console.log(`${LogMessages.MONGO_BD} Connected successfully`);
  });

  mongoose.connection.on('error', (error) => {
    console.log(`${LogMessages.MONGO_BD} Error while connecting`, error);
  });

  mongoose.connection.on('disconnected', () => {
    console.log(`${LogMessages.MONGO_BD} Connection closed successfully`);
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

    console.log('Mongo memory server is running');
  } catch (error) {
    console.log('Mongo memory server: ', error);
  }
};
