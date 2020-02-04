const { getUser, createPasswordHash } = require('../../models/user');
const { removeFromBlackList } = require('../../handlers/session');
const { generateToken } = require('../../handlers/token');

module.exports = async ( req, res ) => {
    try {
        const { login, password } = req.body;
        const user = await getUser( login );
        const passwordHash = createPasswordHash( password );
        if ( user.hash === passwordHash ) {
            removeFromBlackList( user.id );
            const token = generateToken({ user_id: user.id });
            return res.status(200).json({ type: 'success', message: 'Login success', token })
        }
        res.status(401).json({ type: 'error', message: 'Access denied' })
    } catch (e) {
        console.error(e);
        res.status(500).json({ type: 'error', message: 'Something wrong' });
    }
}

// curl -X POST -H "Content-Type: application/json" -d "{\"login\":\"kolman\", \"password\":\"password\"}" localhost:3000/api/auth/login

