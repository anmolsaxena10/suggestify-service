var express = require('express');
var homeController = require('../controller/home');
var registerGetController = require('../controller/register/get');
var registerPostController = require('../controller/register/post');
var loginGetController = require('../controller/login/get');
var loginPostController = require('../controller/login/post');
var aboutController = require('../controller/about');
var howToController = require('../controller/how_to');
var dashController = require('../controller/dashboard');
var router = express.Router();

router.get('/', homeController);
router.get('/dashboard', dashController);
router.get('/register', registerGetController);
router.post('/register', registerPostController);
router.get('/login', loginGetController);
router.post('/login', loginPostController);
router.get('/about', aboutController);
router.get('/how_to', howToController);

module.exports = router;