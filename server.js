'use strict';

const express = require('express');
const path = require('path');
//const favicon = require('serve-favicon');
//const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const routes = {};
routes['index'] = require('./routes/index');
routes['api_index'] = require('./routes/api/index');
routes['api_login'] = require('./routes/api/login');
routes['api_menu'] = require('./routes/api/menu');

const db = new (require('./db/db_init.js')).Db();
for (let key in routes) {
    routes[key].common.db = db;
}

const app = express(); // express.createServer() is deprecated
const port = 8181;

app.use(cookieParser());
app.use(session({
    secret: 'example',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Static files
app.use('/css', express.static('./css'));
app.use('/lib', express.static('./lib'));
app.use('/js',  express.static('./js'));


// View engine setup
app.set('view engine', 'jade');
app.set('view options', { layout: false });
//app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/',    routes['index']);
app.use('/api', routes['api_index']);
app.use('/api', routes['api_login']);
app.use('/api', routes['api_menu']);

app.listen(port);
console.log('Node listening on port %s', port);

/*
app.use(checkAuth);
app.use(app.router);
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
*/