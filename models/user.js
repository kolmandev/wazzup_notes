const crypto = require('crypto');
const config = require('config');
const secret = config.get('secret');
const { sendQuery } = require('../database/connection');


const getUser = async ( login ) => {
    const query = {
        sql: `SELECT id, hash FROM users WHERE login = ?;`,
        values: [ login ]
    }
    const result = await sendQuery( query );
    if ( result[0] ) {
        return result[0];
    }
    return null;
}

const createPasswordHash = ( password ) => {
    return crypto.pbkdf2Sync( password, secret, 1000, 32, 'sha512' ).toString('hex');
}

const saveUserToDb = async ( login, hash ) => {
    const query = {
        sql: `INSERT INTO users ( login, hash ) VALUES ( ?, ? );`,
        values: [ login, hash ]
    }
    const result = await sendQuery( query );
    return result.insertId;
}

module.exports = { 
    getUser,
    createPasswordHash,
    saveUserToDb
}