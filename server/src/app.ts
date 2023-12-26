import 'module-alias/register';
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { LogMessages, appConfig, AppPaths } from '@constants';
import { errorMiddleware, notFoundMiddleware } from '@middlewares';
import { connectMongoDB, disconnectMongoDB } from '@utils';

import { apiRouter } from './apiRouter';

export const createServer = () => {
  const { CLIENT_URI } = appConfig;

  const server = express();

  server.use(express.json());
  server.use(cookieParser());
  server.use(
    cors({
      credentials: true,
      origin: CLIENT_URI,
    }),
  );
  server.use(AppPaths.BASE, apiRouter);
  server.use(AppPaths.NOT_FOUND, notFoundMiddleware);
  server.use(errorMiddleware);

  return server;
};

export const startServer = async (server: Express) => {
  const { HOST, PORT, DB_URI } = appConfig;

  try {
    await connectMongoDB(DB_URI);

    server.listen(PORT, () => {
      console.log(`${LogMessages.SERVER_RUNS} ${HOST}:${PORT}`);
    });
  } catch (error) {
    console.log(error);

    await disconnectMongoDB();
  }
};
