const express = require('express');
const app = express();

app.use( express.json({ extended: true }));

app.get('/', require('./routes/main.route'));
app.get('/help', require('./routes/help.route'));

app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/notes', require('./routes/notes.route'));
app.use('/', ( req, res ) => {
    res.status(404).json({ type: 'error', message: 'Invalid request, read help' });
})

module.exports = app;