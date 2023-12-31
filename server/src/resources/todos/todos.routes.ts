import { Router } from 'express';

import { AppPaths } from '@constants';
import { authMiddleware, validateResource } from '@middlewares';

import { todosController } from './todos.controller';
import { TodoSchema } from './todos.schema';

export const todosRouter = Router();

todosRouter.get(AppPaths.ROOT, authMiddleware, todosController.getAllTodos);
todosRouter.post(
  AppPaths.ROOT,
  authMiddleware,
  validateResource(TodoSchema),
  todosController.createTodo,
);
todosRouter.put(
  AppPaths.WITH_ID,
  authMiddleware,
  validateResource(TodoSchema),
  todosController.updateTodo,
);
todosRouter.delete(
  AppPaths.WITH_ID,
  authMiddleware,
  todosController.deleteTodo,
);
