const { createNote } = require('../../models/notes');

module.exports = async ( req, res ) => {
    try {
        const { text, shared } = req.body;
        if ( !text || !text.length ) {
            return res.status(400).json({ type: 'error', message: 'Text is required for creating note' });
        }
        const user = req.user;
        const note = await createNote( user.user_id, text, shared );
        res.status(201).json({ type: 'success', message: 'Note is created', note });
    } catch (e) {
        console.error(e);
        res.status(500).json({ type: 'error', message: 'Something wrong' });
    }
}

// curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOjd9LCJpYXQiOjE1ODA5NTcyMDcsImV4cCI6MTU4MDk2MDgwN30.AQn2b9jWDmgh6s8clj9zk7giGv6Y1Hg3LdATvHIwxf0" -d "{\"text\":\"Hello, this is my new note\"}" localhost:3000/api/notes/create