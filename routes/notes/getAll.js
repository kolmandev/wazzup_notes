const { getAll } = require('../../models/notes');

module.exports = async ( req, res ) => {
    try {
        const user = req.user;
        const notes = await getAll( user.user_id );
        if ( notes.length ) {
            return res.status(200).json({ type: 'success', notes });
        }
        res.status(200).json({ type: 'success', message: 'No one note is here' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ type: 'error', message: 'Something wrong' });
    }
}

// curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOjd9LCJpYXQiOjE1ODA3OTQ3NzQsImV4cCI6MTU4MDc5ODM3NH0.XS9v6SrwWUFgGKSrqDZTd-nyDX0ZhvcTD-vM2x8coW0" localhost:3000/api/notes

// curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOjh9LCJpYXQiOjE1ODA3OTczMTgsImV4cCI6MTU4MDgwMDkxOH0.vjPBpArgSyVvv27GJ_5d3bnlyWoqW32bwy4f0GcC0Rc" localhost:3000/api/notes
