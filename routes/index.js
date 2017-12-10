'use strict';

const express = require('express');
const router = express.Router();
const session = require('../session');
const common = {};

router.get('/whoami', (req, res, next) => {
    res.render('whoami', {
        title: 'Whoami?!',
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