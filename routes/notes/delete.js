const { deleteNote } = require('../../models/notes');

module.exports = async ( req, res ) => {
    try {
        const user = req.user;
        const note_id = req.params.id;
        const noteIsDeleted = await deleteNote( note_id, user.user_id );
        if ( noteIsDeleted ) {
            return res.status(200).json({ type: "success", message: 'Note is deleted' });
        }
        res.status(404).json({ type: 'error', message: 'Note is not found' });
    } catch (e) {
        res.status(500).json({ type: 'error', message: 'Something wrong' });
    }
}

// curl -X DELETE -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOjh9LCJpYXQiOjE1ODA3OTczMTgsImV4cCI6MTU4MDgwMDkxOH0.vjPBpArgSyVvv27GJ_5d3bnlyWoqW32bwy4f0GcC0Rc"  localhost:3000/api/notes/delete/1