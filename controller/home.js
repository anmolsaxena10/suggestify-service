module.exports = function(req, res){
    var demoToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiI1YzdiOTQ4M2RmYjczZjVjNGY0NTIwNGYiLCJlbWFpbCI6ImFubW9sLnNheGVuYTEwQGdtYWlsLmNvbSIsImFwcF9uYW1lIjoiQW5tb2wgU2F4ZW5hIiwiaWF0IjoxNTUyOTkyNTMwfQ.97eGLJSOloqgBFSg7fdJmVXBkKELGWz0VlmKAVIJpAI';
    res.render('home.html', {
        'menu': req.menu,
        'token': demoToken
    });
}