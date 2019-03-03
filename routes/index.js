var express = require('express');
var homeController = require('../controller/home');
var registerGetController = require('../controller/register/get');
var registerPostController = require('../controller/register/post');
var loginGetController = require('../controller/login/get');
var loginPostController = require('../controller/login/post');
var aboutController = require('../controller/about');
var howToController = require('../controller/how_to');
var dashController = require('../controller/dashboard');
var logoutController = require('../controller/logout');
var auth = require('../utils/authenticate');
var navbar = require('../utils/navbar');
var router = express.Router();

router.get('/', navbar, homeController);
router.get('/dashboard', [auth.loginRequired, navbar], dashController);
router.get('/register', navbar, registerGetController);
router.post('/register', navbar, registerPostController);
router.get('/login', navbar, loginGetController);
router.post('/login', navbar, loginPostController);
router.get('/about', navbar, aboutController);
router.get('/how_to', navbar, howToController);
router.get('/logout', [auth.loginRequired, navbar], logoutController);

module.exports = router;