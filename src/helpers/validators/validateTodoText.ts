export const validateTodoText = (todoText: string) => {
  const validator = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g;

  return !validator.test(todoText);
};
