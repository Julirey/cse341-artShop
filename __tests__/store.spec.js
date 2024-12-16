const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const { initDb } = require('../data/database');

beforeAll(async () => {
  await initDb();
});

describe('Test Store Routes', () => {
  test('responds to /store', async () => {
    const res = await request.get('/store');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /store/:id', async () => {
    const res = await request.get('/store/675c0fef5fd030c68f3ed6aa');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /store/type/:type', async () => {
    const res = await request.get('/store/type/painting');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
});
