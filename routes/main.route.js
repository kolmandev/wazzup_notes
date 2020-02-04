module.exports = ( req, res ) => {
    res.status(200).json({ message: 'Hello! This is note api. You can register, create notes and shared it for another users. Go to /help page for looking api commads'});
}