const { sendQuery } = require('../database/connection');

module.exports = async () => {
    const query = 'TRUNCATE users; TRUNCATE notes;';
    await sendQuery( query );
}