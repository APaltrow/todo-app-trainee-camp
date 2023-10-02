import { ChangeEvent, useEffect, useState } from 'react';

import {
  checkForSpecialCharacters,
  checkIfDateBigger,
  getCreationExpirationDates,
} from '@helpers';
import { ITodo } from '@types';
import { useActions } from '@redux';

const DEFAULT_TODO = {
  text: '',
  creationDate: '',
  expirationDate: '',
} as ITodo;

export const useTodoTask = () => {
  const { addTodo } = useActions();

  const [todo, setTodo] = useState<ITodo>(DEFAULT_TODO);

  const [todoInputError, setTodoInputError] = useState('');
  const [dateError, setDateError] = useState('');

  const onTodoTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    setTodo((prevTodo) => ({ ...prevTodo, text }));
  };
  const onDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const expirationDate = new Date(e.target.value).toISOString();

    setTodo((prevTodo) => ({
      ...prevTodo,
      expirationDate,
    }));
  };

  const onCreateTodo = () => {
    if (todoInputError || dateError || !todo.text) return;

    let newTodo = {
      ...todo,
      id: Date.now(),
    };

    if (!newTodo.creationDate) {
      newTodo = {
        ...newTodo,
        ...getCreationExpirationDates(1),
      };
    }

    addTodo(newTodo);
    setTodo(DEFAULT_TODO);
  };

  const onAddTodo = () => {
    const creationDate = new Date().toISOString();

    setTodo((prevTodo) => ({ ...prevTodo, creationDate }));
  };
  const clearTodo = () => {
    setTodo(DEFAULT_TODO);
  };

  /* Validations */

  useEffect(() => {
    const isSpecialCharacter = checkForSpecialCharacters(todo.text);
    if (isSpecialCharacter) {
      setTodoInputError('Task should not contain special characters');
    } else {
      setTodoInputError('');
    }
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
      setDateError('Incorect expiration date');
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
    onCreateTodo,
    onDateChange,
    onTodoTextChange,
  };
};
