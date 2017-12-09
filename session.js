'use strict';

function getPromise(request) {
    return new Promise((resolve, reject) => {
        const session = request.session;
        if (session.ok && session.ok === true) {
            resolve(session);
        } else {
            reject('No session');
        }
    });
}

exports.getPromise = getPromise;