const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const { initDb } = require('../data/database');

beforeAll(async () => {
  await initDb();
});

describe('Test User Routes', () => {
  test('responds to /user', async () => {
    const res = await request.get('/user');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /user/:id', async () => {
    const res = await request.get('/user/675d76ac86268396243fd4af');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
});
