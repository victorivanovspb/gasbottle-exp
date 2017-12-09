'use strict';

let fs = require('fs');
let file = './bin/test.db';
let exists = fs.existsSync(file);

if (!exists) {
    console.log('Creating DB file');
    fs.openSync(file, 'w');
}

let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(file);

db.serialize(function() {
    //db.run('CREATE TABLE Users (userId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, login TEXT, password TEXT, role INTEGER)'); //  PRIMARY KEY AUTOINCREMENT NOT NULL, Login varchar(255), Password varchar(255), Role INTEGER, Comment varchar(255))');
    db.run('CREATE TABLE Users (' +
        'userId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,' +
        'login TEXT,' +
        'password TEXT,' +
        'role INTEGER)');

    let stmt = db.prepare('INSERT INTO Users (login, password, role) VALUES (?, ?, ?)');
    stmt.run('admin', 'pass', '1'); // Roles: 1 - admin, 2 - operator
    stmt.run('admin1', 'pass', '1');
    stmt.run('vladimir', 'pass', '1');
    stmt.run('user', 'pass', '1');
    stmt.run('operator', 'pass', '2');
    stmt.finalize();
});
db.close();

function printUsers(db) {
    db.serialize(function() {
        db.each('SELECT userId, login, password, role FROM Users', function (err, row) {
            console.log("id=" + row.userId + ", role=" + row.role + ", login=" + row.login + ", psw=" + row.password);
        });
    });
    db.close();
}

//db = new sqlite3.Database(file);
//printUsers(db);
//db.close();

//db.each('SELECT UserId AS id, Login AS login, Password AS pass, Comment AS cmt FROM Users', function(err,row) {
//console.log("[id=" + row.id + "] [login=" + row.login + "] [password=" + row.pass + "] [comment=" + row.cmt + "]");
//});
    /*
    if (!exists) {
        db.run('CREATE TABLE Users (' +
            'UserId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,' +
            'Login varchar(255),' +
            'Password varchar(255),' +
            'Role INTEGER,' +
            'Comment varchar(255)' +
            ')');
    }*/

    //let stmt = db.prepare('INSERT INTO Users (Login, Password, Role, Comment) VALUES (?, ?, ?, ?)');

    // Insert Data
    //db.run('INSERT INTO Users (Login, Password, Role, Comment) VALUES (admin, pass, 1, Hello)');
    //stmt.run("admin, pass, 1, Default admin account");

    // UserId AS id, Login AS login, Password AS pass, Comment AS cmt FROM Users
    //db.run('SELECT * FROM Users', function(err, row) {
    //    console.log(row);
        //console.log("[" + row.id + "] [" + row.login + "] [" + row.pass + "] [" + row.cmt + "]");
    //});

    // if this is not written, will not close db
    //stmt.finalize();
//});