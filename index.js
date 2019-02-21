var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var nunjucks = require('nunjucks')
var router = require('./routes/index');

var port = process.env.SERVICE_PORT | 1234;

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'html');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(morgan('dev'));
app.use('/', router);

var server = app.listen(port);
console.log('Magic happens at http://localhost:' + port);