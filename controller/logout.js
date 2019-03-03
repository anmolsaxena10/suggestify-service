var auth = require('../utils/authenticate');

module.exports = function(req, res){
    auth.logout(req);
    res.redirect('/');
}