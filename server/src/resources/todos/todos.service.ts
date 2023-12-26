import { ITodo, ITodoDocument, UserId } from '@interfaces';

import { todosModel } from './todos.model';
import { TodoDto } from './todos.dto';
import { UserTodoInput } from './todos.schema';

class TodosService {
  async getAll(userId: string) {
    const todos = await todosModel.find<ITodoDocument>({ user: userId });

    return todos.map<ITodo>((todo) => new TodoDto(todo)).reverse();
  }

  async create(userId: UserId, todoInput: UserTodoInput['body']) {
    const todoCandidate = {
      ...todoInput,
      user: userId,
    } as ITodoDocument;

    const newTodo = await todosModel.create<ITodoDocument>(todoCandidate);

    return new TodoDto(newTodo) as ITodo;
  }
}

export const todosService = new TodosService();
