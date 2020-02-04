const { editNote } = require('../../models/notes');

module.exports = async ( req, res ) => {
    try {
        const { text, shared } = req.body;
        const user = req.user;
        const note_id = req.params.id;
        const note = await editNote( note_id, user.user_id, text, shared );
        if ( note ) {
            return res.status(200).json({ type: 'success', message: 'Note is edited', note });
        }
        res.status(404).json({ type: 'error', message: 'Note is not found' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ type: 'error', message: 'Something wrong' });
    }
}

// curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOjh9LCJpYXQiOjE1ODA3OTczMTgsImV4cCI6MTU4MDgwMDkxOH0.vjPBpArgSyVvv27GJ_5d3bnlyWoqW32bwy4f0GcC0Rc" -d "{\"text\":\"Hello, this is my updated note\", \"shared\":\"true\"}" localhost:3000/api/notes/edit/1