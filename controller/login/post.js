var auth = require('../../utils/authenticate');

module.exports = function(req, res){
    var app_name = req.body.app_name;
    var password = req.body.password;
    if(password!=undefined && password!='' && app_name!=undefined && app_name!=''){
        auth.doLogin(app_name, password);
        res.render('dashboard.html');
    }
    else{
        res.redirect('/login');
    }
}