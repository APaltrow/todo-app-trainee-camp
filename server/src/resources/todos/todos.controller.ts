import { Request, Response, NextFunction } from 'express';

import { ApiError } from '@utils';

import { todosService } from './todos.service';

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
}

export const todosController = new TodosController();
