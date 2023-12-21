import request from 'supertest';

import app from '../../app';

describe('[request validation check]: AUTH-LOGIN', () => {
  it('recognizes missing email', (done) => {
    request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        password: '123456',
      })
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.message).toBe('Invalid credentials');
        expect(res.body.errors[0].message).toBe('Email is required');
        done();
      });
  });
});

describe('[request validation check]: AUTH-LOGIN', () => {
  it('recognizes invalid email', (done) => {
    request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test@',
        password: '123456',
      })
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.message).toBe('Invalid credentials');
        expect(res.body.errors[0].message).toBe('Invalid email');
        done();
      });
  });
});

describe('[request validation check]: AUTH-LOGIN', () => {
  it('recognizes missing password', (done) => {
    request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test@gmail.com',
      })
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.message).toBe('Invalid credentials');
        expect(res.body.errors[0].message).toBe('Password is required');
        done();
      });
  });
});

describe('[request validation check]: AUTH-LOGIN', () => {
  it('recognizes invalid password', (done) => {
    request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test@gmail.com',
        password: '123',
      })
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.message).toBe('Invalid credentials');
        expect(res.body.errors[0].message).toBe(
          'Password should be at least 6 chars',
        );
        done();
      });
  });
});

describe('[request validation check]: AUTH-LOGIN', () => {
  it('recognizes invalid password type', (done) => {
    request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test@gmail.com',
        password: 123456,
      })
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.message).toBe('Invalid credentials');
        expect(res.body.errors[0].message).toBe(
          'Expected string, received number',
        );
        done();
      });
  });
});

describe('[rote check]: AUTH-LOGIN', () => {
  test('responds with login successful json', async () => {
    request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test@gmail.com',
        password: '123456',
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('accessToken');
        expect(res.body.email).toBe('test@gmail.com');
        expect(res.body.accessToken.length).toBeGreaterThan(0);
      });
  });
});
