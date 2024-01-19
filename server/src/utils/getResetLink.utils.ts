import { RESET_LINK_DIVIDER, RESET_PREFIX, appConfig } from '@constants';

const { CLIENT_URI } = appConfig;

export const getResetLink = (id: string) => {
  const resetId = `${id}${RESET_LINK_DIVIDER}${Date.now()}`;

  const resetPassLink = `${CLIENT_URI}${RESET_PREFIX}${resetId}`;

  return {
    resetId,
    resetPassLink,
  };
};
