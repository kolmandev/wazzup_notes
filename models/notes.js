const { sendQuery } = require('../database/connection');

const getAll = async ( user_id ) => {
    const query = {
        sql: 'SELECT id, text, updatedAt, createdAt, shared FROM notes WHERE user_id = ?; ',
        values: [ user_id ]
    }
    return await sendQuery( query );
}

const getShared = async ( note_id ) => {
    const query = {
        sql: 'SELECT text FROM notes WHERE id = ? AND shared = "true";',
        values: [ note_id ]
    }
    return await sendQuery( query );
}

const createNote = async ( user_id, text, shared = 'false' ) => {
    const values = [ 
        user_id, 
        text.slice(0,1000), 
        new Date(), 
        new Date(), 
        shared 
    ];
    const query = {
        sql: `INSERT INTO notes ( user_id, text, updatedAt, createdAt, shared ) VALUES ( ? );
              SELECT id, text, updatedAt, createdAt, shared FROM notes WHERE id = last_insert_id();`,
        values: [ values ]
    }
    const result = await sendQuery( query );
    return result[1][0];
}

const editNote = async ( id, user_id, text, shared ) => {
    const setValues = { 
        updatedAt: new Date() 
    }
    if ( text !== undefined ) {
        setValues.text = text.slice(0,1000);
    }
    if ( shared !== undefined ) {
        setValues.shared = shared;
    }
    const query = {
        sql: `UPDATE notes SET ? WHERE id = ? AND user_id = ?;
              SELECT id, text, updatedAt, createdAt, shared FROM notes WHERE id = ? AND user_id = ?;`,
        values: [ setValues, id, user_id, id, user_id ]
    }
    const result = await sendQuery( query );
    if ( +result[0].affectedRows === 1 ) {
        return result[1][0];
    }
    return null;
}

const deleteNote = async ( id, user_id ) => {
    const query = {
        sql: 'DELETE FROM notes WHERE id = ? AND user_id = ?;',
        values: [ id, user_id ]
    }
    const result = await sendQuery( query );
    if ( +result.affectedRows === 1 ) {
        return true;
    }
    return false;
}

module.exports = {
    getAll,
    getShared,
    createNote,
    editNote,
    deleteNote
}