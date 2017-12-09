'use strict';

const express = require('express');
const path = require('path');
//const favicon = require('serve-favicon');
//const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const routes = require('./routes/index');
const routes_api = require('./routes/api/index');
const routes_api_login = require('./routes/api/login');
const routes_api_menu = require('./routes/api/menu');

const db = new (require('./db/db_init.js')).Db();
routes.common.db = db;
routes_api.common.db = db;
routes_api_login.common.db = db;
routes_api_menu.common.db = db;

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
app.use('/',    routes);
app.use('/api', routes_api);
app.use('/api', routes_api_login);
app.use('/api', routes_api_menu);

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