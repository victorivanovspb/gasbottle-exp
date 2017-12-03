'use strict';

//let fs = require('fs');
let express = require('express');
let path = require('path');
//let favicon = require('serve-favicon');
//let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');

const db = new (require('./db_init.js')).Db();

let routes = require('./routes/index');
let routes_api = require('./routes/api');

routes.common.db = db;
routes_api.common.db = db;

let app = express(); // express.createServer() is deprecated
let port = 8181;


app.use(cookieParser());
app.use(session({
    secret: 'example',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// Static files
app.use('/css', express.static('./css'));
app.use('/lib', express.static('./lib'));
app.use('/js',  express.static('./js'));


// View engine setup
app.set('view engine', 'jade');
app.set('view options', {
    layout: false
});
//app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/api', routes_api);

app.listen(port);
console.log('Node listening on port %s', port);


//app.use(checkAuth);
//app.use(app.router);
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));

/*app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});*/