'use strict';

$( document ).ready(() => {
    console.log('main.js: ready');
    identifyRole(createBlockByRole);
});

function identifyRole(success) {
    $.ajax({
        type: 'POST',
        url:  '/api/whoami',
        data: '',
        dataType: 'json',
        success: success
    });
}

function createBlockByRole(jsonData) {
    if (jsonData.state === true) {
        switch (jsonData.user_role) {
            case 1:
                window.myBlock = new AdministratorBlock();
                break;

            case 2:
                window.myBlock = new OperatorBlock();
                break;
        }
    }
}

/*
$.getScript('/path/to/imported/script.js', function()
{
    // script is now loaded and executed.
    // put your dependent JS here.
});
*/