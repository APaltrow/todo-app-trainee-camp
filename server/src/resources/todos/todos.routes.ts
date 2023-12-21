import { Request, Response, NextFunction, Router } from 'express';

import { AppPaths } from '@constants';
import { authMiddleware } from '@middlewares';

import { todosController } from './todos.controller';

export const todosRouter = Router();

todosRouter.get(AppPaths.ROOT, authMiddleware, todosController.getAllTodos);
