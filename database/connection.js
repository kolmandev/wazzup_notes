const mysql  = require('mysql');
const config = require('config');
const mysqlConfig  = config.get('mysql');
const { logQuery } = require('./logging')

const pool = mysql.createPool({
    connectionLimit : mysqlConfig.connectionLimit,
    password        : mysqlConfig.password,
    database        : mysqlConfig.database,
    host            : mysqlConfig.host,
    user            : mysqlConfig.user,
    multipleStatements: true
});

function sendQuery ( query) {
    return new Promise( ( resolve, reject ) => {
        const qry = pool.query( query, ( err, result ) => {
            logQuery( qry.sql ); // логирование запросов
            if ( err ) {
                if ( err.code === 'ER_DUP_ENTRY' ) {
                    return reject( err );
                    // Дубликат по ключам
                    //console.error('Дубликат строки');
                } else if ( err.code === 'ER_ACCESS_DENIED_ERROR' ) {
                    // нет доступа к бд
                    //console.error('Нет доступа к бд');
                } else if ( err.code === 'ER_PARSE_ERROR' ) {
                    // не правильно составлен запрос
                    //console.error(`Неверно составлен запрос: ${ err.sql }`);
                } else if ( err.code === 'ER_DATA_TOO_LONG' ) {
                    // значение больше длины поля
                } else if ( err.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD' ) {
                    // неверное значение, например, при попытке вставить слово в поле INT
                } else {
                    reject( err );
                }
                console.error( err );
                reject( err );
            } else {
                resolve( result );
            }
        });
    });
}

module.exports = { sendQuery }
