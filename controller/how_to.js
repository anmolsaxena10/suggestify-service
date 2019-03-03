module.exports = function(req, res){
    res.render('howto.html', {'menu': req.menu});
}