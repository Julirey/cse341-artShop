const app = require('../server');
const supertest = require('supertest');
const { expect, beforeAll } = require('@jest/globals');
const request = supertest(app);
const { initDb } = require('../data/database')

beforeAll(async () => {
  await initDb();
})

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

describe('Test Sculpture Routes', () => {
  test('responds to /sculpture', async () => {
    const res = await request.get('/sculpture');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200)
  })

  test('responds to /sculpture/:id', async () => {
    const res = await request.get('/sculpture/675c0f2b5fd030c68f3ed6a8');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200)
  })

  test('responds to /sculpture/artist/:artist', async () => {
    const res = await request.get('/sculpture/artist/Michelangelo');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200)
  })

  test('responds to /sculpture/material/:material', async () => {
    const res = await request.get('/sculpture/material/steel');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200)
  })
})

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