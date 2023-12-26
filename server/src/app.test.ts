import request from 'supertest';

import { createServer } from './app';

const app = createServer();

describe('[route check]: NOT FOUND ', () => {
  it('responds with a not found message', async () => {
    const { statusCode } = await request(app).get('/not-existing-route');

    expect(statusCode).toBe(404);
  });
});

describe('[route check]: HEALTH', () => {
  it('responds with a json message', async () => {
    const { statusCode, body } = await request(app)
      .get('/api/health')
      .set('Accept', 'application/json');

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Server is up and running !');
  });
});
