import { ChangeEvent, useEffect, useState } from 'react';

import { useActions } from '@redux';
import {
  checkForSpecialCharacters,
  checkIfDateBigger,
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
  const { addTodo, setTodoDone, deleteTodo, editTodo, setFilterTodo } =
    useActions();

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
    setFilterTodo(FilterOptions.ALL);
    setTodo(DEFAULT_TODO);
  };

  const onAddTodo = () => {
    const creationDate = new Date().toISOString();

    setTodo((prevTodo) => ({ ...prevTodo, creationDate }));
  };

  const clearTodo = () => {
    setTodo(DEFAULT_TODO);
  };

  const onSetDone = (todoId: number) => {
    setTodoDone(todoId);
  };

  const onDeleteTodo = (todoId: number) => {
    deleteTodo(todoId);
  };

  const onEditTodo = (todoToEdit: ITodo) => {
    setTodo(todoToEdit);
  };

  const onSaveEditTodo = () => {
    editTodo(todo);
  };

  /* Validations */

  useEffect(() => {
    const isSpecialCharacter = checkForSpecialCharacters(todo.text);

    if (isSpecialCharacter) {
      setTodoInputError(ErrorMessages.NO_SPECIAL_CHARACTERS);
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
