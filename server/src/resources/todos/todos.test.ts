import request from 'supertest';

import app from '../../app';

const EXPIRED_ACCESS_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODE4NzdkODU3YWQ0MGZkMWM4MWY3MSIsImlhdCI6MTcwMzE1NjU1MywiZXhwIjoxNzAzMTU4MzUzfQ.DujN3iU1Y4hiHPQOTxDgNf166kgX42FnPgrBkqs-Jfk';

const VALID_ACCESS_TOKEN_USER_1 =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODE4NzdkODU3YWQ0MGZkMWM4MWY3MSIsImlhdCI6MTcwMzE2Njk5MiwiZXhwIjoxNzA1NzU4OTkyfQ.6QZbAdDyYBODvUy6K9HULElCirKI8v0FMbLnKwdIsmc';
const VALID_ACCESS_TOKEN_USER_2 =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODE4NzlkODU3YWQ0MGZkMWM4MWY3MyIsImlhdCI6MTcwMzE2NzAwOCwiZXhwIjoxNzA1NzU5MDA4fQ.8np3L-MP50n_rI0iBrWOnK4tKJCKChGdC7tOkLmpr64';

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
