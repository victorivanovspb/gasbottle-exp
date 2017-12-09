'use strict';

$( document ).ready(() => {
    console.log('tmp');
    $( '#whoami' ).click(() => {
        $.ajax({
            type: 'POST',
            url:  '/api/whoami',
            data: '',
            dataType: 'json',
            success: (data) => {
                console.log(data);
            }
        });

    })
});