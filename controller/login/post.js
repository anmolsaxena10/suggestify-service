var auth = require('../../utils/authenticate');
var jwt = require('../../utils/jwt');

module.exports = async function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    if(password!=undefined && password!='' && email!=undefined && email!=''){
        var user = await auth.getTenant(email, password);
        if(user!=null){
            req.session.isLoggedIn = true;
            req.session.user = {
                tenant_id: user._id,
                email: user.email,
                app_name: user.app_name
            }
            req.session.jwtToken = jwt.sign(req.session.user);
        }
        res.redirect('/');
    }
    else{
        res.redirect('/login');
    }
}