const { getShared } = require('../../models/notes');

module.exports = async ( req, res ) => {
    try {
        const note_id = req.params.id;
        const note = await getShared( note_id );
        if ( note.length ) {
            return res.status(200).json({ type: 'success', note });
        }
        res.status(404).json({ type: 'error', message: 'Note is not found' })
    } catch (e) {
        console.error(e);
        res.status(500).json({ type: 'error', message: 'Something wrong' });
    }
}