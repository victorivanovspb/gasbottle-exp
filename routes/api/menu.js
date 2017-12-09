'use strict';

const express = require('express');
const router = express.Router();
const session = require('../../session');
const path = require('path');
const readFile = require('fs-readfile-promise');
const common = {};

router.post('/menu', (request, response, next) => {
    console.log('POST /api/menu');
    const promise = session.getPromise(request);
    promise
        .then((session) => {
            return new Promise((resolve, reject) => {
                common.db.get_user(session.user, resolve);
            });
        })
        .then((answer) => {
            if (answer.state) {
                switch (answer.user.role) {
                    case 1: // administrator
                        return readFile(path.resolve( __dirname, '../../json/menu/administrator.json')); // promise

                    case 2: // operator
                        return readFile(path.resolve( __dirname, '../../json/menu/operator.json')); // promise
                }
            }
        })
        .then((data) => {
            response.send(data);
        })
        .catch(() => {
            response.send(JSON.stringify({'state' : false}));
        });
});

module.exports = router;
module.exports.common = common;