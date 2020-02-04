const { verifyToken } = require('../handlers/token');
const { isInBlackList } = require('../handlers/session');

module.exports = async ( req, res, next ) => {
    try {
        const authHeader = req.get('Authorization');
        if ( !authHeader ) return res.status(401).json({ type: 'error', message: 'Access denied' });

        const token = authHeader.split(' ')[1];
        const decoded = await verifyToken( token );
        const user = decoded.data;
        const userIsLogouted = await isInBlackList( user.user_id );
        if ( userIsLogouted ) {
            return res.status(401).json({ type: 'error', message: 'Session is over' });
        }
        req.user = user;
        next();
    } catch (e) {
        console.error(e);
        if ( e.type === 'tokenError' ) {
            return res.status(401).json({ type: 'error', message: 'Invalid token' });
        }
        return res.status(500).json({ type: 'error', message: 'Something wrong' });
    }
}
