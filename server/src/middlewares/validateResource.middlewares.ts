import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

import { Statuses, ValidationErrors } from '@constants';

export const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { body, query, params } = req;

    try {
      schema.parse({
        body,
        query,
        params,
      });

      return next();
    } catch (error: any) {
      return res.status(Statuses.BAD_REQUEST).json({
        message: ValidationErrors.INVALID_CREDENTIALS,
        errors: error.errors,
      });
    }
  };
