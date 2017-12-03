class MyPage {
    constructor() {
        this.navMenu = {};

        this.printNav = this.printNav.bind(this);
        this.printPage = this.printPage.bind(this);

        this.loadNav = this.loadNav.bind(this);
        this.loadPage = this.loadPage.bind(this);

        this.currentPage = 'home';
    }
    printNav() {
        console.log('print nav menu');
        this.navMenu['nav-menu'].forEach(el => {
            let sp = $('<span>' + el['title'] + '</span>');
            sp.click(() => {
                console.log(el['id']);
                post('/api/page-content', window.myPage.loadPage.bind(this), JSON.stringify({'pageId': el['id']}));
            });
            $( '#navCmd' ).append(sp);
        });
    }
    loadNav(data) {
        console.log('load nav menu');
        this.navMenu = data;
        this.currentPage = data['current-page'];
        this.printNav();
    }
    printPage() {
        console.log('print page content');
    }
    loadPage() {
        console.log('load page content');
        this.printPage();
    }
}

window.myPage = new MyPage();

$( document ).ready(() => {
    console.log('nav');

    post('/api/nav-menu', window.myPage.loadNav.bind(this), '');
    post('/api/page-content', window.myPage.loadPage.bind(this), JSON.stringify({'pageId': window.myPage.currentPage}));

});

function post(url, callback, data) {
    $.ajax({
        type: 'POST',
        url: url,
        data: { jsonData: data },
        dataType: 'json',
        success: callback
    });
}