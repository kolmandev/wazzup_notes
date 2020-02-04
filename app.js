const express = require('express');
const app = express();
const config = require('config');
const PORT = config.get('serverPort') || 3000;

app.use( express.json({ extended: true }));

app.get('/', require('./routes/main.route'));
app.get('/help', require('./routes/help.route'));

app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/notes', require('./routes/notes.route'));
app.use('/', ( req, res ) => {
    res.status(404).json({ type: 'error', message: 'Invalid request, read help' });
})

app.listen(PORT, () => console.log(`Server started on ${ PORT } port`));