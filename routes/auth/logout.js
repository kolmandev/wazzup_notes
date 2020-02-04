const { addToBlackList } = require('../../handlers/session');
const { verifyToken } = require('../../handlers/token');

module.exports = async ( req, res ) => {
    try {
        const authHeader = req.get('Authorization');
        if ( !authHeader ) return res.status(401).json({ type: 'error', message: 'Access denied' });

        const token = authHeader.split(' ')[1];
        const decoded = await verifyToken( token );
        const user = decoded.data;
        addToBlackList( user.user_id );
        res.status(200).json({ type: 'success', message: 'Logouted' });
    } catch(e) {
        console.error(e)
        if ( e.type === 'tokenError' ) {
            return res.status(401).json({ type: 'error', message: 'Invalid token' });
        }
        res.status(500).json({ type: 'error', message: 'Something wrong' });
    }
}

// curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOjh9LCJpYXQiOjE1ODA3OTczMTgsImV4cCI6MTU4MDgwMDkxOH0.vjPBpArgSyVvv27GJ_5d3bnlyWoqW32bwy4f0GcC0Rc" localhost:3000/api/auth/logout

