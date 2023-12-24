import request from 'supertest';

import { createServer } from '../../app';

const app = createServer();

describe('[request validation check]: AUTH-LOGIN', () => {
  it('recognizes missing email', async () => {
    const { statusCode, body } = await request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        password: '123456',
      });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('errors');
    expect(body.message).toBe('Invalid credentials');
    expect(body.errors[0].message).toBe('Email is required');
  });
});

describe('[request validation check]: AUTH-LOGIN', () => {
  it('recognizes invalid email', async () => {
    const { statusCode, body } = await request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test@',
        password: '123456',
      });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('errors');
    expect(body.message).toBe('Invalid credentials');
    expect(body.errors[0].message).toBe('Invalid email');
  });
});

describe('[request validation check]: AUTH-LOGIN', () => {
  it('recognizes missing password', async () => {
    const { statusCode, body } = await request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test@gmail.com',
      });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('errors');
    expect(body.message).toBe('Invalid credentials');
    expect(body.errors[0].message).toBe('Password is required');
  });
});

describe('[request validation check]: AUTH-LOGIN', () => {
  it('recognizes invalid password', async () => {
    const { statusCode, body } = await request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test@gmail.com',
        password: '123',
      });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('errors');
    expect(body.message).toBe('Invalid credentials');
    expect(body.errors[0].message).toBe('Password should be at least 6 chars');
  });
});

describe('[request validation check]: AUTH-LOGIN', () => {
  it('recognizes invalid password type', async () => {
    const { statusCode, body } = await request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test@gmail.com',
        password: 123456,
      });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('errors');
    expect(body.message).toBe('Invalid credentials');
    expect(body.errors[0].message).toBe('Expected string, received number');
  });
});

describe('[rote check]: AUTH-LOGIN', () => {
  it('recognizes unexisting user credentials', async () => {
    const { statusCode, body } = await request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test@gmail.com',
        password: '123456',
      });

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Incorrect email or password');
  });
});
