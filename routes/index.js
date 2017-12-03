let express = require('express');
let router = express.Router();

const common = {};

router.get('/', (req, res, next) => {
    let sess = req.session;
    if (sess.ok && sess.ok === true) {
        res.render('index', { title: 'App', username: sess.user });
    } else {
        res.redirect('/login');
    }
});

router.get('/login', (req, res, next) => {
    res.render('login', {});
});

router.post('/login', (req, res, next) => {
    let user = req.body.username; // req.param('username') is deprecated
    let pass = req.body.password; // req.param('password') is depracated

    let promise = new Promise((resolve, reject) => {
        common.db.check_user(user, pass, resolve);
    });
    promise
        .then((answer) => {
            return new Promise((resolve, reject) => {
                if (answer.state) {
                    resolve(answer);
                } else {
                    reject('Debug: проблемы с обращением к БД.');
                }
            })
        })
        .then((answer) => {
            if (answer.checked) {
                let sess = req.session;
                sess.ok = req.body.username === user;
                sess.user = req.body.username;
                res.redirect('/');
            } else {
                return new Promise((resolve, reject) => {
                    reject('Неправильный логин и пароль.');
                });
            }
        })
        .catch((message) => {
            res.render('login', {msg: message});
        });
});

router.post('/logout', (req, res, next) => {
    let sess = req.session;
    if (sess.ok === true) {
        sess.ok = false;
        sess.user = '';
    }
    res.redirect('/');
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