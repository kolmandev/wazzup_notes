const request = require('supertest');
const app = require('../app');
const truncateTables = require('./truncateTables');
const { removeFromBlackList } = require('../handlers/session')

const NEWUSER = { login: 'newuser', password: 'somepassword' };
const SECONDUSER = { login: 'seconduser', password: 'secondpassword' };
let token, secondToken;

beforeAll( async () => {
    await truncateTables();
})

afterAll( async () => {
    await Promise.all([
        truncateTables(),
        removeFromBlackList( 1 ),
        removeFromBlackList( 2 )
    ])
})

test('Register user before testing notes and taking token', async () => {
    const resp = await request(app)
        .post('/api/auth/register')
        .send( NEWUSER );
    expect( resp.statusCode ).toBe(201);
    expect( resp.body ).toEqual(
        expect.objectContaining({ token: expect.any(String) })
    )
    token = resp.body.token;
})

test('Register second user before testing notes', async () => {
    const resp = await request(app)
        .post('/api/auth/register')
        .send( SECONDUSER );
    expect( resp.statusCode ).toBe(201);
    expect( resp.body ).toEqual(
        expect.objectContaining({ token: expect.any(String) })
    )
    secondToken = resp.body.token;
})

describe('Test /api/notes path', () => {
    test('GET method without token in header should return 401 status code', async () => {
        const resp = await request(app).get('/api/notes');
        expect( resp.statusCode ).toBe(401);
    })
    test('GET method with valid token before creating notes should return 200 status code with message about no notes', async () => {
        const resp = await request(app)
            .get('/api/notes')
            .set('Authorization', `Bearer ${ token }`);
        expect( resp.statusCode ).toBe(200);
        expect( resp.body ).toEqual(
            expect.objectContaining({ message: expect.any(String) })
        )
        expect( resp.body.message ).toMatch(/No one/);
    })
})

describe('Test /api/notes/create path', () => {
    test('POST method with invalid token shoud return 401 status code', async () => {
        const resp = await request(app)
            .post('/api/notes/create')
            .set('Authorization', `Bearer wrongtoken`)
            .send({ text: 'Some text' });
        expect( resp.statusCode ).toBe(401);
    })
    test('POST method with valid token and without text prop in body should return 400 status code', async () => {
        const resp = await request(app)
            .post('/api/notes/create')
            .set('Authorization', `Bearer ${ token }`)
            .send({ message: 'Hello' });
        expect( resp.statusCode ).toBe(400);
    })
    test('POST method with valid token and valid body should return 201 status code and new note, contains id and text params', async () => {
        const resp = await request(app)
            .post('/api/notes/create')
            .set('Authorization', `Bearer ${ token }`)
            .send({ text: 'Hello world' });
        expect( resp.statusCode ).toBe(201);
        expect( resp.body ).toEqual(
            expect.objectContaining({ note: expect.any(Object) })
        )
        expect( resp.body.note).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                text: expect.any(String)
            })
        )
    })
})

test('Test /api/notes after inserting note should return 200 status code and array of notes', async () => {
    const resp = await request(app)
        .get('/api/notes')
        .set('Authorization', `Bearer ${ token }`);
    expect( resp.statusCode ).toBe(200);
    expect( resp.body).toEqual(
        expect.objectContaining({ notes: expect.any(Array) })
    )
})

test('Test /api/notes for second user after creating note for first user should return 200 status code with message about no notes', async () => {
    const resp = await request(app)
        .get('/api/notes')
        .set('Authorization', `Bearer ${ secondToken }`);
    expect( resp.statusCode ).toBe(200);
    expect( resp.body ).toEqual(
        expect.objectContaining({ message: expect.any(String) })
    )
    expect( resp.body.message ).toMatch(/No one/);
})

test('POST method with valid token and with text and shared prop should return 201 status code and new note, contains id, text and shared params', async () => {
    const resp = await request(app)
        .post('/api/notes/create')
        .set('Authorization', `Bearer ${ secondToken }`)
        .send({ text: 'Hello world', shared: 'true' });
    expect( resp.statusCode ).toBe(201);
    expect( resp.body ).toEqual(
        expect.objectContaining({ note: expect.any(Object) })
    )
    expect( resp.body.note).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            text: expect.any(String),
            shared: expect.stringMatching('true')
        })
    )
})

describe('Test /api/notes/edit path', () => {
    test('PUT method without id of note in address should return 404 status code', async () => {
        const resp = await request(app)
            .put('/api/notes/edit')
            .set('Authorization', `Bearer ${ token }`)
            .send({ text: 'Edited text' });
        expect( resp.statusCode ).toBe(404);
    })
    test('PUT method without token should return 401 status code', async () => {
        const resp = await request(app)
            .put('/api/notes/edit/1')
            .send({ text: 'Some text' });
        expect( resp.statusCode ).toBe(401);
    })
    test('PUT method with valid token and without text or shared prop in body should return 400 status code', async () => {
        const resp = await request(app)
            .put('/api/notes/edit/1')
            .set('Authorization', `Bearer ${ token }`)
            .send({ message: 'I want to edit my note!'});
        expect( resp.statusCode ).toBe(400);
    })
    test('PUT method with valid token and with text prop in body but with incorrect id in address should return 404 status code', async () => {
        const resp = await request(app)
            .put('/api/notes/edit/8')
            .set('Authorization', `Bearer ${ token }`)
            .send({ text: 'Some text' });
        expect( resp.statusCode ).toBe(404);
    })
    test('PUT method with valid token and text prop in body and correct note id should return 200 status code and edited note', async () => {
        const resp = await request(app)
            .put('/api/notes/edit/1')
            .set('Authorization', `Bearer ${ token }`)
            .send({ text: 'Edited text' });
        expect( resp.statusCode ).toBe(200);
        expect( resp.body ).toEqual(
            expect.objectContaining({ note: expect.any(Object) })
        )
    })
})

describe('Test /api/notes/delete path', () => {
    test('DELETE method without note ID should return 404 status code', async () => {
        const resp = await request(app)
            .delete('/api/notes/delete');
    })
    test('DELETE method without token should return 401 status code', async () => {
        const resp = await request(app)
            .delete('/api/notes/delete/1');
        expect( resp.statusCode ).toBe(401);
    })
    test('DELETE method with alien valid token should return 404 status code', async () => {
        const resp = await request(app)
            .delete('/api/notes/delete/1')
            .set('Authorization', `Bearer ${ secondToken }`);
        expect( resp.statusCode ).toBe(404);
    })
    test('DELETE method with valid token and valid note ID should return 200 status code', async () => {
        const resp = await request(app)
            .delete('/api/notes/delete/1')
            .set('Authorization', `Bearer ${ token }`);
        expect( resp.statusCode ).toBe(200);
    })
})

describe('Test /api/notes/shared path', () => {
    test('GET method of shared note with invalid id should return 404 status code', async () => {
        const resp = await request(app)
            .get('/api/notes/shared/8');
        expect( resp.statusCode ).toBe(404);
    })
    test('GET method of shared note ID should return 200 status code with note', async () => {
        const resp = await request(app)
            .get('/api/notes/shared/2');
        expect( resp.statusCode ).toBe(200);
        expect( resp.body ).toEqual(
            expect.objectContaining({ note: expect.any(Object) })
        )
    })
})