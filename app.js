const express = require('express');
const app = express();
const config = require('config');
const PORT = config.get('serverPort') || 3000;

app.use( express.json({ extended: true }));

// api/anypage { token }
//     if ( token is expired ) return error unauthorized
//     else if ( token.session_id not in sessions ) return error unauthorized
//     else okay
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/notes', require('./routes/notes.route'));

app.listen(PORT, () => console.log(`Server started on ${ PORT } port`));