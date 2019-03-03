module.exports = function(req, res){
    if(req.session.isLoggedIn) res.redirect('/');
    else res.render('login.html', {'menu': req.menu});
}