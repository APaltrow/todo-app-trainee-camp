export const checkForSpecialCharacters = (text: string) => {
  const validator = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g;

  return validator.test(text);
};
