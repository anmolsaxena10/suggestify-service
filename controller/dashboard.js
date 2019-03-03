module.exports = function(req, res){
    var c = {
        'menu': req.menu,
        'user': req.session.user,
        'token': req.session.jwtToken
    }
    res.render('dashboard.html', c);
}