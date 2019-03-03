var mongoCon = require('./mongo').Connection;

exports.loginRequired = function(req, res, next){
    if(req.session.isLoggedIn == true){
        next();
    }
    else res.redirect('/login');
}

exports.getTenant = async function(email, password){
    var user =  await mongoCon.db.collection('tenants').findOne({
        email: email,
        password: password
    });
    return user;
}

exports.logout = function(req){
    req.session.isLoggedIn = false;
    req.session.jwtToken = null;
}