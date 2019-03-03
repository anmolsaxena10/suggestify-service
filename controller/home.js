module.exports = function(req, res){
    res.render('home.html', {'menu': req.menu});
}