'use strict';

const express = require('express');
const router = express.Router();
const session = require('../../session');
const common = {};

router.post('/whoami', (request, response, next) => {
    console.log('POST /api/whoami');
    const promise = session.getPromise(request);
    promise
        .then((session) => {
            return new Promise((resolve, reject) => {
                common.db.get_user(session.user, resolve);
            });
        })
        .then((dbResponse) => {
            response.send(JSON.stringify({
                "state"     : true,
                "session"   : true,
                "user_name" : dbResponse.user.login,
                "user_role" : dbResponse.user.role
            }));
        })
        .catch((message) => {
            response.send(JSON.stringify({
                "state"   : false,
                "session" : false,
                "msg"     : message
            }));
        });
});

module.exports = router;
module.exports.common = common;