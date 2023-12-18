import dotenv from 'dotenv';

import { DefaultAppConfig } from './defaultAppConfig';

dotenv.config();

const { PORT, DB_URI, CLIENT_URI } = process.env;

export const appConfig = {
  CLIENT_URI: CLIENT_URI || DefaultAppConfig.CLIENT_URI,
  DB_URI: DB_URI || DefaultAppConfig.DB_URI,
  PORT: PORT || DefaultAppConfig.HOST,
  HOST: DefaultAppConfig.HOST,
};
