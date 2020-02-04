module.exports = async ( req, res, next ) => {
    const { text, shared } = req.body;
    if ( shared === undefined && text === undefined ) {
        return res.status(400).json({ type: 'error', message: 'Text and/or shared prop is required for edit note' });
    }
    if ( shared !== undefined && shared !== 'true' && shared !== 'false' ) {
        return res.status(400).json({ type: 'error', message: 'Shared prop must be "true" or "false" value' });
    }
    if ( text !== undefined && text.length === 0 ) {
        return res.status(400).json({ type: 'error', message: 'Text must be not empty' });
    }
    next();
}  