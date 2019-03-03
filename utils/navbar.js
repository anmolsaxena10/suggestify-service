module.exports = function(req, res, next){
    if(req.session.isLoggedIn){
        req.menu = [
            {
                name: 'Home',
                url: '/'
            },
            {
                name: 'Dashboard',
                link: '/dashboard'
            },
            {
                name: 'How To',
                url: '/how_to'
            },
            {
                name: 'About',
                url: '/about'
            },
            {
                name: 'Logout',
                url: '/logout'
            }
        ];
    }
    else{
        req.menu = [
            {
                name: 'Home',
                url: '/'
            },
            {
                name: 'How To',
                url: '/how_to'
            },
            {
                name: 'About',
                url: '/about'
            },
            {
                name: 'Register',
                url: '/register'
            }
        ];
    }
    next();
}