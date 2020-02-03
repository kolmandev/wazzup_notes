// api/login { login, password }
//     findUserInDb( login )
//     checkUserPassword( password )
//     if ( error ) return error 400 access denied
//     else
    
//     session = createSession( user )
//     saveSessionInCache( session )
//     token = createJwt( session ).sign()
//     send token

const login = async ( req, res ) => {
    res.send('hi from login');
}

module.exports = login;