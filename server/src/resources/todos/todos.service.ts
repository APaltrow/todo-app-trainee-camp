import { ITodo, ITodoDocument } from '@interfaces';

import { todosModel } from './todos.model';
import { TodoDto } from './todos.dto';

class TodosService {
  async getAll(userId: string) {
    const todos = await todosModel.find<ITodoDocument>({ user: userId });

    return todos.map<ITodo>((todo) => new TodoDto(todo));
  }
}

export const todosService = new TodosService();
