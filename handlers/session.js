const redis = require('redis');
const blackList = redis.createClient();
const config = require('config');
const EXP = config.get('blackListExpired');

const addToBlackList = ( user_id ) => {
    blackList.set( user_id, true, 'EX', EXP );
}

const removeFromBlackList = user_id => {
    blackList.del( user_id );
}

const isInBlackList = user_id => {
    return new Promise( ( resolve, reject ) => {
        blackList.get( user_id, ( err, result ) => {
            if ( err ) {
                reject( err );
            }   
            resolve( result );
        });
    })
}

module.exports = { addToBlackList, removeFromBlackList, isInBlackList }