import { Request, Response, NextFunction } from 'express';

import { ApiError } from '@utils';
import { UserId } from '@interfaces';

import { todosService } from './todos.service';
import { UserTodoInput } from './todos.schema';

class TodosController {
  async getAllTodos(req: Request, res: Response, next: NextFunction) {
    const userId = req.headers.authorization;

    if (!userId) {
      return next(ApiError.Unauthorized());
    }

    try {
      const todos = await todosService.getAll(userId);

      return res.json(todos);
    } catch (error) {
      return next(error);
    }
  }

  async createTodo(
    req: Request<{}, {}, UserTodoInput['body']>,
    res: Response,
    next: NextFunction,
  ) {
    const userId = req.headers.authorization as unknown as UserId;
    const todoInput = req.body;

    try {
      const newTodo = await todosService.create(userId, todoInput);

      return res.json(newTodo);
    } catch (error) {
      return next(error);
    }
  }
}

export const todosController = new TodosController();
