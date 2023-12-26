import { ChangeEvent, useEffect, useState } from 'react';

import { useActions } from '@redux';
import { DEFAULT_DAYS_GAP } from '@constants';
import {
  checkForSpecialCharacters,
  checkIfDateBigger,
  checkIsEmptyString,
  getCreationExpirationDates,
} from '@helpers';
import { ErrorMessages, FilterOptions, ITodo } from '@types';

const DEFAULT_TODO = {
  text: '',
  isDone: false,
  creationDate: '',
  expirationDate: '',
} as ITodo;

export const useTodoTask = () => {
  const { deleteTodo, setFilterTodo, createTodoThunk, updateTodoThunk } =
    useActions();

  const [todo, setTodo] = useState<ITodo>(DEFAULT_TODO);

  const [todoInputError, setTodoInputError] = useState('');

  const [dateError, setDateError] = useState('');

  const onTodoTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    setTodo((prevTodo) => ({ ...prevTodo, text }));
  };

  const onDateChange = (timestamp: string) => {
    const expirationDate = new Date(timestamp).toISOString();

    setTodo((prevTodo) => ({
      ...prevTodo,
      expirationDate,
    }));
  };

  const onCreateTodo = async (successCb?: () => void) => {
    if (todoInputError || dateError || !todo.text) return;

    let newTodo = {
      ...todo,
    };

    if (!newTodo.creationDate) {
      newTodo = {
        ...newTodo,
        ...getCreationExpirationDates(DEFAULT_DAYS_GAP),
      };
    }

    const isSuccess = await createTodoThunk(newTodo);

    if (!isSuccess) return;

    setFilterTodo(FilterOptions.ALL);
    setTodo(DEFAULT_TODO);

    if (successCb) {
      successCb();
    }
  };

  const onAddTodo = () => {
    const creationDate = new Date().toISOString();

    setTodo((prevTodo) => ({ ...prevTodo, creationDate }));
  };

  const clearTodo = () => {
    setTodo(DEFAULT_TODO);
  };

  const onDeleteTodo = (todoId: number | string) => {
    deleteTodo(todoId);
  };

  const onEditTodo = (todoToEdit: ITodo) => {
    setTodo(todoToEdit);
  };

  const onSaveEditTodo = async (onSuccessCb: () => void) => {
    const isSuccess = await updateTodoThunk(todo);

    if (!isSuccess) return;

    onSuccessCb();
  };

  const onSetDone = (todoToEdit: ITodo) => {
    updateTodoThunk({ ...todoToEdit, isDone: !todoToEdit.isDone });
  };

  /* Validations */

  useEffect(() => {
    const isSpecialCharacter = checkForSpecialCharacters(todo.text);
    const isEmpty = checkIsEmptyString(todo.text);

    if (isSpecialCharacter) {
      setTodoInputError(ErrorMessages.NO_SPECIAL_CHARACTERS);
      return;
    }

    if (isEmpty) {
      setTodoInputError(ErrorMessages.INVALID_TEXT);
      return;
    }

    setTodoInputError('');
  }, [todo.text]);

  useEffect(() => {
    if (!todo?.creationDate || !todo?.expirationDate) {
      setDateError('');
      return;
    }

    const isCreationDateBigger = checkIfDateBigger(
      todo.creationDate,
      todo.expirationDate,
    );

    if (isCreationDateBigger) {
      setDateError(ErrorMessages.INCORRECT_EXPIRATION_DATE);
    } else {
      setDateError('');
    }
  }, [todo.expirationDate]);

  return {
    todo,
    dateError,
    todoInputError,

    clearTodo,
    onAddTodo,
    onSetDone,
    onDeleteTodo,
    onEditTodo,
    onSaveEditTodo,
    onCreateTodo,
    onDateChange,
    onTodoTextChange,
  };
};
