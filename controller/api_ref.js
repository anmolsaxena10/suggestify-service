module.exports = function(req, res){
    res.render('apiref.html', {'menu': req.menu});
}