const jwt = require('jsonwebtoken');
const config = require('config');
const SECRET = config.get('tokenSecret');
const tokenExpired = config.get('tokenExpired');

const generateToken = data => {
    return jwt.sign({ data }, SECRET, { expiresIn: tokenExpired, noTimestamp: false, algorithm: 'HS256' });
}

const verifyToken = token => {
    return new Promise( ( resolve, reject ) => {
        jwt.verify( token, SECRET, { algorithms: ['HS256'] }, ( err, result ) => {
            if ( err ) {
                return reject({ type: 'tokenError', message: 'InvalidToken' })
            }
            resolve( result );
        })
    })
}

module.exports = { generateToken, verifyToken }