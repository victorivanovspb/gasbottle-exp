'use strict';

let fs = require('fs');
let file = './bin/test.db';
let exists = fs.existsSync(file);

if (exists) {
    let sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database(file);
    printUsers(db);
}

function printUsers(db) {
    db.serialize(function() {
        db.each('SELECT userId, login, password, role FROM Users', function (err, row) {
            console.log("id=" + row.userId + ", role=" + row.role + " " + row.login + " | " + row.password);
        });
    });
    db.close();
}