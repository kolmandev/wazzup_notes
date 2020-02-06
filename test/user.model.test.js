const { saveUserToDb, getUser } = require('../models/user');
jest.mock('../database/connection');
const { sendQuery } = require('../database/connection');

test('get users by login should return id and hash', async () => {
    const user = { id: 1, hash: 'somehash'};
    const resp = [{ id: 1, hash: 'somehash' }];
    sendQuery.mockResolvedValue( resp );
    const data = await getUser('someuser');
    expect(data).toEqual( user );
});

test('save user to db should return id = 1 for new user', async () => {
    const newId = 1;
    const resp = { affectedRows: 1, insertId: 1 };
    sendQuery.mockResolvedValue( resp );
    const data = await saveUserToDb( 'anylogin', 'anyhash' );
    expect( data ).toBe( newId );
})


