module.exports = function(req, res){
    res.render('register.html', {'menu': req.menu});
}