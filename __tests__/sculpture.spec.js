const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const { initDb } = require('../data/database');

beforeAll(async () => {
  await initDb();
});

describe('Test Sculpture Routes', () => {
  test('responds to /sculpture', async () => {
    const res = await request.get('/sculpture');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /sculpture/:id', async () => {
    const res = await request.get('/sculpture/675c0f2b5fd030c68f3ed6a8');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /sculpture/artist/:artist', async () => {
    const res = await request.get('/sculpture/artist/Michelangelo');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /sculpture/material/:material', async () => {
    const res = await request.get('/sculpture/material/steel');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
});
