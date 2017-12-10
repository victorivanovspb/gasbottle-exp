const path = require('path');
const readFile = require('fs-readfile-promise');

const express = require('express');
const router = express.Router();
const session = require('../../session');
const common = {};

router.post('/page-content', function(req, res, next) {
    const pageId = JSON.parse(req.body.jsonData)['pageId'];
    console.log('router post /api' + req.url + ' ' + pageId);
    const promise = session.getPromise(request);
    promise
        .then((sess) => {
            return new Promise((resolve, reject) => {
                common.db.get_user(sess.user, resolve);
            });
        })
        .then((answer) => {
            if (answer.state) {
                //console.log('get_user=' + answer.user.login + ' role=' + answer.user.role);
                return new Promise((resolve, reject) => {
                    if (checkPageIdAndUserRole(pageId, answer.user.role)) {
                        resolve({
                            id: pageId,
                            role: answer.user.role
                        });
                    } else {
                        reject('Debug: pageId and user role');
                    }
                });
            } else {
                return new Promise((resolve, reject) => {
                    reject('Debug: !answer.state');
                })
            }
        })
        .then((obj) => {
            switch (obj.pageId) {
                case 'administrators':
                    return new Promise((resolve, reject) => {
                        resolve(getContentAdministrators());
                    });

            }
        })
        /*.then((obj) => {
            return new Promise((resolve, reject) => {
                common.db.get_users_by_role(obj.role, resolve);
            });
        })*/
        .then((answer) => {
            //console.log('list: ' + answer);
            console.log(answer.list);
            res.send(JSON.stringify({
                "state" : "ok"
            }));
        })
        .catch((message) => {
            res.send(JSON.stringify({
                    "state" : "err",
                    "msg"   : message
                }));
        })
});

function checkPageIdAndUserRole(pageId, userRole) { // Check Ids: pageId for user role
    let mass = [];
    switch (userRole) {
        case 1: // administrator
            mass = ['home', 'places', 'operators', 'administrators'];
            break;
        case 2: // operator
            mass = ['home', 'sale', 'refill', 'exchange'];
            break;
    }

    let result = false;
    for (let i in mass) {
        result = (mass[i] === pageId) ? true : result;
    }
    return result;
}

function getContentAdministrators() {
    let promise = new Promise((resolve, reject) => {
        common.db.get_users_by_role(1, resolve);
    });
    promise
        .then((answer) => {
            for (i in answer.list) {
                answer.list[i]
            }
        })
    /*.then((obj) => {
            return new Promise((resolve, reject) => {
                common.db.get_users_by_role(obj.role, resolve);
            });
        })*/
}

module.exports = router;
module.exports.common = common;