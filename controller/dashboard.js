module.exports = function(req, res){
    var c = {
        'menu': req.menu,
        'user': req.session.user
    }
    res.render('dashboard.html', c);
}