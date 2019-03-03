var jwt = require('jsonwebtoken');
var secret = require('../config/keys').jwt_secret;

exports.sign = function(user){
    return jwt.sign(user, secret);
}