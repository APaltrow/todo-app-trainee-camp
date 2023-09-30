import { ChangeEvent, useEffect, useState } from 'react';

import { generateDates, validateDates, validateTodoText } from '@helpers';
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
        ...generateDates(),
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
    /* Validating text input */
    const isValidText = validateTodoText(todo.text);
    if (!isValidText) {
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
    /* Validating dates */

    const isValidDate = validateDates(todo.creationDate, todo.expirationDate);
    if (!isValidDate) {
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
