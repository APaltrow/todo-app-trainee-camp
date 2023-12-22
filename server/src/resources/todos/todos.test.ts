import request from 'supertest';

import {
  EXPIRED_ACCESS_TOKEN,
  VALID_ACCESS_TOKEN_USER_1,
  VALID_ACCESS_TOKEN_USER_2,
} from '@constants';

import app from '../../app';

describe('[auth middleware check]: TODOS', () => {
  it('recognizes unauthorized user with no access token', (done) => {
    request(app)
      .get('/api/todos')
      .set('Accept', 'application/json')
      .send()
      .expect(401)
      .then((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Unauthorized user');
        done();
      });
  });
});

describe('[auth middleware check]: TODOS', () => {
  it('recognizes expired access token', (done) => {
    request(app)
      .get('/api/todos')
      .set('Accept', 'application/json')
      .set('Authorization', EXPIRED_ACCESS_TOKEN)
      .send()
      .expect(401)
      .then((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Unauthorized user');
        done();
      });
  });
});

describe('[auth middleware check]: TODOS', () => {
  test('recognizes authenticated user with valid access token', async () => {
    request(app)
      .get('/api/todos')
      .set('Accept', 'application/json')
      .set('Authorization', VALID_ACCESS_TOKEN_USER_1)
      .send()
      .expect(200);
  });
});

describe('[route check]: TODOS /GET', () => {
  test('responds with an array of todos belonging to user #1', async () => {
    request(app)
      .get('/api/todos')
      .set('Accept', 'application/json')
      .set('Authorization', VALID_ACCESS_TOKEN_USER_1)
      .send()
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).toHaveLength(3);
        expect(res.body[1].text).toBe('Hug a panda [user #1]');
      });
  });
});

describe('[route check]: TODOS /GET', () => {
  test('responds with an array of todos belonging to user #2', async () => {
    request(app)
      .get('/api/todos')
      .set('Accept', 'application/json')
      .set('Authorization', VALID_ACCESS_TOKEN_USER_2)
      .send()
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).toHaveLength(3);
        expect(res.body[1].text).toBe('Learn React [user #2]');
      });
  });
});

describe('[request validation check]: TODOS /POST', () => {
  test('recognizes invalid todo creation / expiration dates', async () => {
    request(app)
      .post('/api/todos')
      .set('Accept', 'application/json')
      .set('Authorization', VALID_ACCESS_TOKEN_USER_2)
      .send({
        text: 'Todo with invalid creation / expiration dates',
        isDone: false,
        creationDate: '2023-12-',
        expirationDate: '2023-12-27',
      })
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.message).toBe('Invalid credentials');
        expect(res.body.errors).toBeInstanceOf(Array);
        expect(res.body.errors).toHaveLength(2);
        expect(res.body[0].message).toBe('Invalid creation date');
        expect(res.body[1].message).toBe('Invalid expiration date');
      });
  });
});

describe('[request validation check]: TODOS /POST', () => {
  test('recognizes invalid todo text', async () => {
    request(app)
      .post('/api/todos')
      .set('Accept', 'application/json')
      .set('Authorization', VALID_ACCESS_TOKEN_USER_2)
      .send({
        text: '',
        isDone: false,
        creationDate: '2023-12-24T12:57:00.585Z',
        expirationDate: '2023-12-27T12:57:00.585Z',
      })
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.message).toBe('Invalid credentials');
        expect(res.body.errors).toBeInstanceOf(Array);
        expect(res.body.errors).toHaveLength(1);
        expect(res.body[0].message).toBe('Text should not be empty');
      });
  });
});

describe('[route check]: TODOS /POST', () => {
  test('responds with created todo json message', async () => {
    request(app)
      .post('/api/todos')
      .set('Accept', 'application/json')
      .set('Authorization', VALID_ACCESS_TOKEN_USER_2)
      .send({
        text: 'validation check todo',
        isDone: false,
        creationDate: '2023-12-24T12:57:00.585Z',
        expirationDate: '2023-12-27T12:57:00.585Z',
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('text');
        expect(res.body).toHaveProperty('isDone');
        expect(res.body).toHaveProperty('creationDate');
        expect(res.body).toHaveProperty('expirationDate');
        expect(res.body.text).toBe('validation check todo');
        expect(res.body.isDone).toBe(false);
        expect(res.body.creationDate).toBe('2023-12-24T12:57:00.585Z');
        expect(res.body.expirationDate).toBe('2023-12-27T12:57:00.585Z');
      });
  });
});
