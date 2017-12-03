'use strict';

let fs = require('fs');

function check_user(user, pass, callback) {
    let file = './db/test.db';
    let exists = fs.existsSync(file);

    if (exists) {
        let sqlite3 = require('sqlite3').verbose();
        let db = new sqlite3.Database(file);

        db.serialize(() => {
            db.get('SELECT count(*) FROM Users WHERE login=\'' + user + '\' AND password=\'' + pass + '\'', (err, row) => {
                callback(row['count(*)'] > 0);
            });
        });
        db.close();
    }
}

exports.check_user = check_user;

/*
function find_user(user, pass) {
    let result = false;

    let fs = require('fs');
    let file = './db/test.db';
    let exists = fs.existsSync(file);

    if (exists) {
        let sqlite3 = require('sqlite3').verbose();
        let db = new sqlite3.Database(file);

        db.serialize(function() {
            db.each('SELECT * FROM Users WHERE login=\'' + user + '\' AND password=\'' + pass + '\'', (err, row) => {
                console.log("[[" + err + "]]");
                console.log("[[" + row.login + "]]");
            });
        });
        db.close();
    }
    return result;
}
 */