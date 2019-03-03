var mongoConn = require('../../utils/mongo').Connection;
var jwt = require('../../utils/jwt');

module.exports = function(req, res){
    console.log(req.body);
    mongoConn.db.collection('tenants').insertOne({
       email: req.body.email,
       app_name: req.body.app_name,
       password: req.body.password
    }, function(err, tenant){
        if(err){
            res.redirect('/register');
        }
        else {
            user = tenant.ops[0];
            req.session.isLoggedIn = true;
            req.session.jwtToken = jwt.sign({
                'tenant_id': user._id,
                'email': user.email,
                'app_name': user.app_name
            });
            res.redirect('/');
        }
    });
}