import { ITodo, ITodoDocument, UserId } from '@interfaces';
import { ApiError } from '@utils';
import { ALL_COMPLETED, ValidationErrors } from '@constants';

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

  async update(todoInput: Omit<UserTodoInput['body'], 'id'>, id: string) {
    if (!id) {
      throw ApiError.BadRequest(ValidationErrors.INVALID_TODO_ID);
    }

    try {
      const updatedTodo = await todosModel.findByIdAndUpdate<ITodoDocument>(
        id,
        todoInput,
        {
          new: true,
        },
      );

      if (!updatedTodo) {
        throw ApiError.BadRequest(ValidationErrors.TODO_NOT_FOUND_BY_ID);
      }

      return new TodoDto(updatedTodo) as ITodo;
    } catch (error) {
      throw ApiError.BadRequest(ValidationErrors.INVALID_TODO_ID);
    }
  }

  async delete(todoId: string, userId: string) {
    try {
      if (!todoId) {
        throw ApiError.BadRequest(ValidationErrors.INVALID_TODO_ID);
      }

      if (todoId === ALL_COMPLETED) {
        await todosModel.deleteMany({ isDone: true, user: userId });
        return;
      }

      await todosModel.deleteOne({ _id: todoId, user: userId });
    } catch (error) {
      throw ApiError.BadRequest(ValidationErrors.INVALID_TODO_ID);
    }
  }
}

export const todosService = new TodosService();
