const app = require('./app');
const config = require('config');
const PORT = config.get('serverPort') || 3000;

app.listen(PORT, () => console.log(`Server started on ${ PORT } port`));