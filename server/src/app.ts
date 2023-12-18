import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import { appConfig, AppPaths, LogMessages } from '@constants';
import { errorMiddleware, notFoundMiddleware } from '@middlewares';

import { apiRouter } from './apiRouter';

const { HOST, PORT, DB_URI, CLIENT_URI } = appConfig;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URI,
  }),
);
app.use(AppPaths.BASE, apiRouter);
app.use(AppPaths.NOT_FOUND, notFoundMiddleware);
app.use(errorMiddleware);

export const startServer = async () => {
  try {
    await mongoose.connect(DB_URI);
    app.listen(PORT, () => {
      console.log(`${LogMessages.SERVER_RUNS} ${HOST}:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

export default app;
