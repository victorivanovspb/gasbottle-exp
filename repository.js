'use strict';

let fs = require('fs');
let file = './db/test.db';
let exists = fs.existsSync(file);

if (!exists){
    console.log('Creating DB file');
    fs.openSync(file, 'w');
}

let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(file);

db.serialize(function() {
    if (!exists) {
        db.run('CREATE TABLE MyTable (' +
            'PersonId int,' +
            'Comment varchar(255),' +
            'PRIMARY KEY (PersonId))');
    }

    let stmt = db.prepare('INSERT INTO MyTable (PersonId, Comment) VALUES (?, ?)');

    // Insert Data
    stmt.run("123, Something");
    stmt.run("124, Something123");

    db.each('SELECT PersonId AS id, Comment FROM MyTable', function(err,row) {
        console.log(row.id + "  : " + row.Comment);
    });
    // if this is not written, will not close db
    stmt.finalize();
});

db.close();