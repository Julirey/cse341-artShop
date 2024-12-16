const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const { initDb } = require('../data/database');

beforeAll(async () => {
  await initDb();
});

describe('Test Painting Routes', () => {
  test('responds to /painting', async () => {
    const res = await request.get('/painting');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /painting/:id', async () => {
    const res = await request.get('/painting/67585bb4e1f936d10bdc5000');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /painting/tag/:tag', async () => {
    const res = await request.get('/painting/tag/old');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /painting/artist/:artist', async () => {
    const res = await request.get('/painting/artist/Joe Rowe');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
});
