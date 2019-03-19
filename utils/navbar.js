module.exports = function(req, res, next){
    if(req.session.isLoggedIn){
        req.menu = [
            {
                name: 'Home',
                url: '/'
            },
            {
                name: 'Dashboard',
                url: '/dashboard'
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
                name: 'API Reference',
                url: '/api_ref'
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
                name: 'API Reference',
                url: '/api_ref'
            },
            {
                name: 'Register',
                url: '/register'
            },
            {
                name: 'Login',
                url: '/login'
            }
        ];
    }
    next();
}