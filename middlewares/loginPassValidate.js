const loginPassValidate = ( req, res, next ) => {
    const { login, password } = req.body;
    
    if ( !login || !login.length ) {
        return res.status(400).json({ type: 'error', message: 'Login is required' });
    }
    if ( !password || !password.length ) {
        return res.status(400).json({ type: 'error', message: 'Password is required' });
    }
    next();
}

module.exports = { loginPassValidate }