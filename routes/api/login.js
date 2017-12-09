'use strict';

const express = require('express');
const router = express.Router();
const common = {};

router.post('/login', (request, response, next) => {
    console.log('POST /api/login');
    const user = request.body['jsonData[username]']; // req.param('username') is deprecated
    const pass = request.body['jsonData[password]']; // req.param('password') is depracated
    const promise = new Promise((resolve, reject) => {
        common.db.check_user(user, pass, resolve);
    });
    promise
        .then((dbResponse) => {
            return new Promise((resolve, reject) => {
                if (dbResponse.state) {
                    resolve(dbResponse);
                } else {
                    reject('Проблемы с обращением к БД');
                }
            });
        })
        .then((dbResponse) => {
            if (dbResponse.checked) {
                request.session.ok = true; //request.body['jsonData[username]'] === ;
                request.session.user = request.body['jsonData[username]'];
                console.log(request.session);
                response.send(JSON.stringify({
                    "state"   : true,
                    "session" : true
                }));
                //response.redirect('/');
            } else {
                return new Promise((resolve, reject) => {
                    reject('Неправильный логин и пароль');
                });
            }
        })
        .catch((message) => {
            response.send(JSON.stringify({
                "state"   : false,
                "session" : false,
                "message" : message
            }));
            //res.render('login', {msg: message});
        });
});

module.exports = router;
module.exports.common = common;