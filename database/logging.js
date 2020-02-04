const fs = require('fs');

function logQuery ( query ) {
    const text = `[${ localeString() }]: \r\n ${ query }`;
    fs.writeFile( 
        './logs/queryLog.txt', 
        text + '\r\n\r\n', 
        { encoding : 'utf-8', flag: 'a+' }, 
        ( err ) => {
            if ( err ) {
                console.error('Ошибка при логировании запроса', err);
            }
        }
    );
}

function localeString ( date = new Date() ) {
    return `${ date.getFullYear() }-${ date.getMonth() +1 }-${ date.getDate() } ${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() }`;
}

module.exports = { logQuery };
