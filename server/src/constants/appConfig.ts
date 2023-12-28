import 'dotenv/config';

import { DefaultAppConfig } from './defaultAppConfig';
import { MODE_DEV } from './common';

const {
  PORT = DefaultAppConfig.PORT,
  DB_URI = DefaultAppConfig.DB_URI,
  CLIENT_URI = DefaultAppConfig.CLIENT_URI,
  JWT_ACCESS_SECRET = '',
  JWT_ACCESS_EXP = '',
  JWT_REFRESH_SECRET = '',
  JWT_REFRESH_EXP = '',
  SALT_ROUNDS = DefaultAppConfig.SALT_ROUNDS,
  NODE_ENV,
} = process.env;

const isDev = NODE_ENV?.trim() === MODE_DEV;

export const appConfig = {
  HOST: DefaultAppConfig.HOST,
  CLIENT_URI: isDev ? DefaultAppConfig.CLIENT_URI : CLIENT_URI,
  DB_URI,
  PORT,
  JWT_ACCESS_SECRET,
  JWT_ACCESS_EXP,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXP,
  SALT_ROUNDS,
};
