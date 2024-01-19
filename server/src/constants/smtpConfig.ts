import { appConfig } from '@constants';

const { SMTP_HOST, SMTP_PASS, SMTP_USER, SMTP_SERVICE } = appConfig;

export const SMTP_CONFIG = {
  service: SMTP_SERVICE,
  host: SMTP_HOST,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
};
