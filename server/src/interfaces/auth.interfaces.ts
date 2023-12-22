import { Request } from 'express';

export interface ReqWithId extends Request {
  userId: string;
}
