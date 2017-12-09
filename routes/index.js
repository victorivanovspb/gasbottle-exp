'use strict';

const express = require('express');
const router = express.Router();
const session = require('../session');
const common = {};

router.get('/tmp', (req, res, next) => {
    res.render('tmp', {
        title: 'tmp',
        username: 'user'
    });
});

router.get('/', (request, response, next) => {
    console.log('POST /');
    const promise = session.getPromise(request);
    promise
        .then((session) => {
            response.render('index', {
                title: 'App',
                username: session.user
            });
        })
        .catch(() => {
            response.redirect('/login');
        });
});

router.get('/login', (request, response, next) => {
    response.render('login', {});
});

router.post('/logout', (request, response, next) => {
    const promise = session.getPromise(request);
    promise
        .then((session) => {
            session.ok = false;
            session.user = '';
            response.redirect('/');
        })
        .catch(() => {
            response.redirect('/');
        });
});

module.exports = router;
module.exports.common = common;

// response.writeHead(200, {'Content-Type': 'text/html'});
// response.write(
// response.end();

// let path = require('path');
// let fr = require(path.resolve( __dirname, "../db_find_row.js" ));
// fr.check_user(user, pass, (answer) => {

// console.log(req.url + ' username=[' + req.param('username') + ']');

/*
common.db.check_user(user, pass, (answer) => {
    if (answer.state) {
        if (answer.checked) {
            let sess = req.session;
            sess.ok = req.param('username') === user;
            sess.user = req.param('username');
            res.redirect('/');
        } else {
            res.render('login', {msg: 'Неправильный логин или пароль.'});
        }
    } else {
        res.render('login', {msg: 'Debug: проблемы с обращение к БД.'});
    }

});
*/