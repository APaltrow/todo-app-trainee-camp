export enum AlertMessages {
  CLEAR_COMPLETED = 'Would you like to clear all completed tasks?',
  CANCEL_TASK = 'Would you like to cancel the taks?',
  CANCEL_EDITING = 'Would you like to cancel the editing?',
  DELETE_TASK = 'Would you like to delete the task?',
}

export interface IAlert {
  text: AlertMessages;

  onConfirm: () => void;
}
