import { FIRST_ARR_INDEX, LINK_EXP_TIME, RESET_LINK_DIVIDER } from '@constants';

export const checkResetLinkExpiration = (link: string) => {
  const timestamp = link.split(RESET_LINK_DIVIDER)[FIRST_ARR_INDEX];

  if (!timestamp) return false;

  const currTime = Date.now();
  const timeDiff = currTime - +timestamp;

  return timeDiff < LINK_EXP_TIME;
};
