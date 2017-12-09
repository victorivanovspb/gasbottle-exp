'use strict';

/*
const fs = require('fs');
const QrCode = require('qrcode-reader');
const imageParser = require("image-parser");
let buffer = fs.readFileSync(__dirname + '/img01.png');
const img = new imageParser(buffer);
img.parse(function(err) {
    if (err) {
        console.error(err);
        // TODO handle error
    }
    var qr = new QrCode();
    qr.callback = function(err, value) {
        if (err) {
            console.error(err);
            // TODO handle error
            return done(err);
        }
        console.log(value.result);
        console.log(value);
    };
    qr.decode({width: img.width(), height: img.height()}, img.buffer);
});
*/

const fs = require('fs');
const QrCode = require('qrcode-reader');
const Jimp = require("jimp");
const buffer = fs.readFileSync(__dirname + '/img03.jpg');
Jimp.read(buffer, function(err, image) {
    if (err) {
        console.error(err);
        // TODO handle error
    }
    let qr = new QrCode();
    qr.callback = function(err, value) {
        if (err) {
            console.error(err);
            // TODO handle error
        }
        console.log(value.result);
        console.log(value);
    };
    qr.decode(image.bitmap);
});
