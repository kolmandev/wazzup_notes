const request = require('supertest');
const app = require('../app');
const { removeFromBlackList } = require('../handlers/session')
const truncateTables = require('./truncateTables');
const NEWUSER = { login: 'newuser', password: 'somepassword' };
let token;

beforeAll( async () => {
    await truncateTables();
})

afterAll( async () => {
    await Promise.all([
        truncateTables(),
        removeFromBlackList( 1 )
    ])
})

describe('Test /api/auth/register path', () => {
    test('GET method should return 404 eror', async () => {
        const resp = await request(app).get('/api/auth/register');
        expect( resp.statusCode ).toBe(404);
    })
    test('POST method without login and password should return 400 error', async () => {
        const resp = await request(app)
            .post('/api/auth/register')
            .send();
        expect( resp.statusCode ).toBe(400);
    })
    test('POST method with login and password should return 200 status code with token in body', async () => {
        const resp = await request(app)
            .post('/api/auth/register')
            .send( NEWUSER );
        expect( resp.statusCode ).toBe(201);
        expect( resp.body ).toEqual(
            expect.objectContaining({ token: expect.any(String) })
        )
        token = resp.body.token;
    })
    test('POST method with login, who already registered should return 400 stats code', async () => {
        const resp = await request(app)
            .post('/api/auth/register')
            .send( NEWUSER );
        expect( resp.statusCode ).toBe(400);
    })
})

describe('Test /api/auth/login path', () => {
    test('GET method should return 404 error', async () => {
        const resp = await request(app).get('/api/auth/login');
        expect( resp.statusCode ).toBe(404);
    })
    test('POST method without body should return 400 error', async () => {
        const resp = await request(app).post('/api/auth/login');
        expect( resp.statusCode ).toBe(400);
    })
    test('POST method with login and wrong pass should return 401 status code', async () => {
        const resp = await request(app)
            .post('/api/auth/login')
            .send({ login: 'newuser', password: 'wrongpassword' });
        expect( resp.statusCode ).toBe(401);
    })
    test('POST method with correct login and pass should return 200 status code with token in body', async () => {
        const resp = await request(app)
            .post('/api/auth/login')
            .send( NEWUSER );
        expect( resp.statusCode ).toBe(200);
        expect( resp.body ).toEqual(
            expect.objectContaining({ token: expect.any(String) })
        )
    })
})

describe('Test /api/auth/logout path', () => {
    test('GET method without token in header should return 401 status code', async () => {
        const resp = await request(app).get('/api/auth/logout');
        expect( resp.statusCode ).toBe(401);
    })
    test('GET method with invalid token in header should return 401 status code', async () => {
        const resp = await request(app)
            .get('/api/auth/logout')
            .set('Authorization', `Bearer ${ token }wrong`);
        expect( resp.statusCode ).toBe(401);
    })
    test('GET method with valid token in header should return 200 status code', async () => {
        const resp = await request(app)
            .get('/api/auth/logout')
            .set('Authorization', `Bearer ${ token }`);
        expect( resp.statusCode ).toBe(200);
    })
})

