'use strict';

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Db {
    constructor() {
        this.file = path.resolve( __dirname, './bin/test.db');
        this.exists = fs.existsSync(this.file);
    }

    check_user(user, pass, callback) {
        let answer = {
            state: false
        };
        if (this.exists) {
            answer.state = true;
            let db = new sqlite3.Database(this.file);
            db.serialize(() => {
                db.get('SELECT count(*) FROM Users WHERE login=\'' + user + '\' AND password=\'' + pass + '\'', (err, row) => {
                    answer.checked = row['count(*)'] > 0;
                    callback(answer);
                });
            });
            db.close();
        } else {
            callback(answer);
        }
    }

    get_user(user, callback) {
        let answer = {
            state: false
        };
        if (this.exists) {
            answer.state = true;
            let db = new sqlite3.Database(this.file);
            db.serialize(() => {
                db.get('SELECT userId, login, password, role FROM Users WHERE login=\'' + user + '\'', (err, row) => {
                    // TODO: check count...
                    answer.user = row;
                    callback(answer);
                });
            });
            db.close();
        } else {
            callback(answer);
        }
    }

    get_users_by_role(role, callback) {
        let answer = {
            state: false,
            list: []
        };
        if (this.exists) {
            answer.state = true;
            let db = new sqlite3.Database(this.file);
            db.serialize(() => {
                db.all('SELECT userId, login, password FROM Users WHERE role =\'' + role +'\'', (err, rows) => {
                    //let util = require('util');
                    //console.log(util.inspect(rows));
                    answer.list = rows;
                    callback(answer);
                });
            });
            db.close();
        } else {
            callback(answer);
        }
    }
}

exports.Db = Db;