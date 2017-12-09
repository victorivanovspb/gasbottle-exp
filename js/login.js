'use strict';

$( document ).ready(() => {
    const $login = $('div#loginA');
    $login
        .find('button')
        .click(() => {
            let data = {
                username: $login.find("input[name='username']").val(),
                password: $login.find("input[name='password']").val()
            };
            $.ajax({
                type: 'POST',
                url: '/api/login',
                data: {
                    jsonData: data
                },
                dataType: 'json',
                success: (data) => {
                    if (data.state === true) {
                        window.location.href = window.location.origin;
                        location.assign(location.origin);
                    } else {
                        $login
                            .find('div.err-msg')
                            .html(data.message);
                    }
                }
            });
        });
});