
// api/register { login, password }
//     saveUserToDb({ login, generateHash( password ) })

//     session = createSession( user )
//     saveSessionInCache( session )
//     token = createJwt( session ).sign()
//     send token

const crypto = require('crypto');
const config = require('config');
const secret = config.get('secret');
const { sendQuery } = require('../../database/connection');

const register = async ( req, res ) => {
    try {
        const { login, password } = req.body;
        if ( !login || !login.length ) {
            return res.status(400).json({ type: 'error', message: 'Login is required' });
        }
        if ( !password || !password.length ) {
            return res.status(400).json({ type: 'error', message: 'Password is required' });
        }

        const passwordHash = createPasswordHash( password );
        await saveUserToDb( login, passwordHash );
        res.status(201).json({ type: 'success', message: 'User registered' })
    } catch (e) {
        if ( e.code === 'ER_DUP_ENTRY' ) {
            return res.status(400).json({ type: 'error', message: 'User already registered, try to login or register another user' })
        }
        return res.status(500).json({ type: 'error', message: 'Something wrong' });
    }
}


function createPasswordHash( password ) {
    return crypto.pbkdf2Sync( password, secret, 1000, 32, 'sha512' ).toString('hex');
}


async function saveUserToDb( login, hash ) {
    const query = {
        sql: `INSERT INTO users ( login, hash ) VALUES ( ?, ? );`,
        values: [ login, hash ]
    }
    const result = await sendQuery( query );
    return result.insertId;
}

module.exports = register;

// curl -X POST -H "Content-Type: application/json" -d "{\"login\":\"kolman\", \"password\":\"password\"}" localhost:3000/api/auth/register