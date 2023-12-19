import dotenv from 'dotenv';

import { DefaultAppConfig } from './defaultAppConfig';

dotenv.config();

const {
  PORT = DefaultAppConfig.PORT,
  DB_URI = DefaultAppConfig.DB_URI,
  CLIENT_URI = DefaultAppConfig.CLIENT_URI,
  JWT_ACCESS_SECRET = '',
  JWT_ACCESS_EXP = '',
  SALT_ROUNDS = DefaultAppConfig.SALT_ROUNDS,
} = process.env;

export const appConfig = {
  HOST: DefaultAppConfig.HOST,
  CLIENT_URI,
  DB_URI,
  PORT,
  JWT_ACCESS_SECRET,
  SALT_ROUNDS,
  JWT_ACCESS_EXP,
};
