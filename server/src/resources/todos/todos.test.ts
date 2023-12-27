import request from 'supertest';

import {
  EXPIRED_ACCESS_TOKEN,
  VALID_ACCESS_TOKEN_USER_1,
  VALID_ACCESS_TOKEN_USER_2,
} from '@constants';

import { createServer } from '../../app';

const app = createServer();

describe('[TEST FOR RESOURCE]: todos', () => {
  describe('[auth middleware check]: TODOS', () => {
    test('recognizes unauthorized user with no access token', async () => {
      const { body, statusCode } = await request(app)
        .get('/api/todos')
        .set('Accept', 'application/json')
        .send();

      expect(statusCode).toBe(401);
      expect(body).toHaveProperty('message');
      expect(body.message).toBe('Unauthorized user');
    });
  });

  describe('[auth middleware check]: TODOS', () => {
    it('recognizes expired access token', async () => {
      const { statusCode, body } = await request(app)
        .get('/api/todos')
        .set('Accept', 'application/json')
        .set('Authorization', EXPIRED_ACCESS_TOKEN)
        .send();

      expect(statusCode).toBe(401);
      expect(body).toHaveProperty('message');
      expect(body.message).toBe('Unauthorized user');
    });
  });

  describe('[auth middleware check]: TODOS', () => {
    test('recognizes authenticated user with valid access token', async () => {
      const { statusCode } = await request(app)
        .get('/api/todos')
        .set('Accept', 'application/json')
        .set('Authorization', VALID_ACCESS_TOKEN_USER_1)
        .send();

      expect(statusCode).toBe(200);
    });
  });

  describe('[route check]: TODOS /GET', () => {
    test('responds with an array of todos', async () => {
      const { statusCode, body } = await request(app)
        .get('/api/todos')
        .set('Accept', 'application/json')
        .set('Authorization', VALID_ACCESS_TOKEN_USER_1)
        .send();

      expect(statusCode).toBe(200);
      expect(body).toBeInstanceOf(Array);
    });
  });

  describe('[request validation check]: TODOS /POST', () => {
    test('recognizes invalid todo creation / expiration dates', async () => {
      const { statusCode, body } = await request(app)
        .post('/api/todos')
        .set('Accept', 'application/json')
        .set('Authorization', VALID_ACCESS_TOKEN_USER_2)
        .send({
          text: 'Todo with invalid creation / expiration dates',
          isDone: false,
          creationDate: '2023-12-',
          expirationDate: '2023-12-27',
        });

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('errors');
      expect(body.message).toBe('Invalid credentials');
      expect(body.errors).toBeInstanceOf(Array);
      expect(body.errors).toHaveLength(2);
      expect(body.errors[0].message).toBe('Invalid creation date');
      expect(body.errors[1].message).toBe('Invalid expiration date');
    });
  });

  describe('[request validation check]: TODOS /POST', () => {
    test('recognizes invalid todo text', async () => {
      const { statusCode, body } = await request(app)
        .post('/api/todos')
        .set('Accept', 'application/json')
        .set('Authorization', VALID_ACCESS_TOKEN_USER_2)
        .send({
          text: '',
          isDone: false,
          creationDate: '2023-12-24T12:57:00.585Z',
          expirationDate: '2023-12-27T12:57:00.585Z',
        });

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('errors');
      expect(body.message).toBe('Invalid credentials');
      expect(body.errors).toBeInstanceOf(Array);
      expect(body.errors).toHaveLength(2);
      expect(body.errors[0].message).toBe('Text should not be empty');
      expect(body.errors[1].message).toBe('Invalid todo text value');
    });
  });

  describe('[route check]: TODOS /POST', () => {
    test('responds with created todo json message', async () => {
      const { statusCode, body } = await request(app)
        .post('/api/todos')
        .set('Accept', 'application/json')
        .set('Authorization', VALID_ACCESS_TOKEN_USER_2)
        .send({
          text: 'validation check todo',
          isDone: false,
          creationDate: '2023-12-24T12:57:00.585Z',
          expirationDate: '2023-12-27T12:57:00.585Z',
        });

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('id');
      expect(body).toHaveProperty('text');
      expect(body).toHaveProperty('isDone');
      expect(body).toHaveProperty('creationDate');
      expect(body).toHaveProperty('expirationDate');
      expect(body.text).toBe('validation check todo');
      expect(body.isDone).toBe(false);
      expect(body.creationDate).toBe('2023-12-24T12:57:00.585Z');
      expect(body.expirationDate).toBe('2023-12-27T12:57:00.585Z');
    });
  });

  describe('[route check]: TODOS /PUT', () => {
    test('responds with invalid todo id error message', async () => {
      const { statusCode, body } = await request(app)
        .put('/api/todos')
        .set('Accept', 'application/json')
        .set('Authorization', VALID_ACCESS_TOKEN_USER_1)
        .send({
          id: '65859bb63d59666b106192aa',
          text: 'Updated todo for user 1',
          isDone: true,
          creationDate: '2023-12-24T12:57:00.585Z',
          expirationDate: '2023-12-27T12:57:00.585Z',
        });
      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('message');
      expect(body.message).toBe('Invalid todo id');
    });
  });

  describe('[route check]: TODOS /DELETE', () => {
    test('responds with invalid todo id error message', async () => {
      const { statusCode, body } = await request(app)
        .delete('/api/todos/not-existing-todo-id')
        .set('Accept', 'application/json')
        .set('Authorization', VALID_ACCESS_TOKEN_USER_1)
        .send();

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('message');
      expect(body.message).toBe('Invalid todo id');
    });
  });

  describe('[route check]: TODOS /DELETE', () => {
    test('responds with success message for deleting all completed todos', async () => {
      const { statusCode, body } = await request(app)
        .delete('/api/todos/all-completed')
        .set('Accept', 'application/json')
        .set('Authorization', VALID_ACCESS_TOKEN_USER_1)
        .send();

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('message');
      expect(body.message).toBe('success');
    });
  });
});
