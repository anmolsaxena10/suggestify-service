module.exports = function(req, res){
    res.render('about.html', {'menu': req.menu});
}