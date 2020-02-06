const request = require('supertest');
const app = require('../app');

test('GET method for the root path should response', async () => {
    const resp = await request(app).get('/');
    expect( resp.statusCode ).toBe(200);
})

test('GET method for help path should response', async () => {
    const resp = await request(app).get('/help');
    expect( resp.statusCode ).toBe(200);
})

test('POST method for help page should return 404 error', async () => {
    const resp = await request(app).post('/help');
    expect( resp.statusCode ).toBe(404);
})

test('GET method for bla path should return 404 error', async () => {
    const resp = await request(app).get('/bla');
    expect( resp.statusCode ).toBe(404);
})