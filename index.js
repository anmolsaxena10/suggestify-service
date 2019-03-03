var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var nunjucks = require('nunjucks');
// var cookieParser = require('cookie-parser');
var session = require('express-session');
var router = require('./routes/index');
var mongoCon = require('./utils/mongo').Connection;
mongoCon.connectToMongo();

var port = process.env.SERVICE_PORT | 1234;

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'html');
app.use(express.static('public'));
// app.use(cookieParser());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(morgan('dev'));
app.use('/', router);

var server = app.listen(port);
console.log('Magic happens at http://localhost:' + port);