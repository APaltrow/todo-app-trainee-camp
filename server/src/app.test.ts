import request from 'supertest';

import app from './app';

describe('[route check]: NOT FOUND ', () => {
  it('responds with a not found message', (done) => {
    request(app).get('/not-existing-route').expect(404, done);
  });
});

describe('[route check]: HEALTH', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          message: 'Server is up and running !',
        },
        done,
      );
  });
});
