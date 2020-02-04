const { generateToken } = require('../../handlers/token');
const { createPasswordHash, saveUserToDb } = require('../../models/user');

module.exports = async ( req, res ) => {
    try {
        const { login, password } = req.body;
        const passwordHash = createPasswordHash( password );
        const user_id = await saveUserToDb( login, passwordHash );
        const token = generateToken({ user_id });
        res.status(201).json({ type: 'success', message: 'User registered', token })
    } catch (e) {
        if ( e.code === 'ER_DUP_ENTRY' ) {
            return res.status(400).json({ type: 'error', message: 'User already registered, try to login or register another user' })
        }
        console.error(e);
        return res.status(500).json({ type: 'error', message: 'Something wrong' });
    }
}


// curl -X POST -H "Content-Type: application/json" -d "{\"login\":\"kolman\", \"password\":\"password\"}" localhost:3000/api/auth/register