var mongoCon = require('./mongo').Connection;

exports.loginRequired = function(req, res, next){
    mongoCon.db.collection('anmol').insertOne({
        name: "anmol",
        mobile_no: "9427260544"
    }, function(err, res){
        if(err) throw err;
        console.log("oh yeah!!!");
    });
    if(req.session.isLoggedIn) next();
    else res.redirect('/login');
}

exports.doLogin = function(app_name, password){
    
}
