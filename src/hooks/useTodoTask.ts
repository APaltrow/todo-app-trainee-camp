import { ChangeEvent, useState } from 'react';

import { generateDates, validateTodoText } from '@helpers';
import { ITodo } from '@types';

export const useTodoTask = () => {
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [todoInputError, setTodoInputError] = useState('');
  const [todo, setTodo] = useState(() => ({ text: '', ...generateDates() }));

  const onTodoTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const isValid = validateTodoText(text);

    setTodo((prevTodo) => ({ ...prevTodo, text }));

    if (!isValid) {
      setTodoInputError('Task should not contain special characters');
    } else {
      setTodoInputError('');
    }
  };

  const onTodoEnter = (e) => {
    const isNotValid = e.key !== 'Enter' || todoInputError || !todo.text;
    if (isNotValid) return;

    const newTodo = {
      id: Date.now(),
      ...todo,
      ...generateDates(),
    };

    setTodoList((prevList) => [...prevList, newTodo]);
    setTodo(() => ({ text: '', ...generateDates() }));
  };

  return {
    todo,
    todoList,
    todoInputError,

    onTodoTextChange,
    onTodoEnter,
  };
};
