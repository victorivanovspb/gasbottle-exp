'use strict';

class Block {
    constructor() {
        console.log('/js/blocks.js: Block');

        this.$nav = $('#navigationMenu');
        this.$content = $('#dataContent');

        (new Promise((resolve, reject) => {
            Block.loadMenu(resolve);
        }))
            .then((data) => {
                this.menu = new Menu(this.$nav, this.$content, data['menu-items'], data['api']);
                this.menu
                    .click(data['current-item']);
            });

        //this.menu
    }
    static loadMenu(success) {
        $.ajax({
            type: 'POST',
            url: '/api/menu',
            data: '',
            dataType: 'json',
            success: success
        });
    }
}

class AdministratorBlock extends Block {
    constructor() {
        super();
        console.log('/js/blocks.js: AdministratorBlock');
    }
}

class OperatorBlock extends Block {
    constructor() {
        super();
        console.log('/js/blocks.js: OperatorBlock');
    }
}

class Menu {
    constructor($menu, $content, menuItems, api) {
        this.$menu = $menu;
        this.$content = $content;
        this.menuSel = {};
        menuItems.forEach((item) => {
            /*
            this.$menu.append(`<span id=${item.id}>${item.title}</span>`);
            this.menuSel[item.id] = this.$menu.find(`#${item.id}`); // ?????????????
            */
            this.menuSel[item.id] = $(`<span id=${item.id}>${item.title}</span>`).appendTo(this.$menu); //.effects(...);
            //this.menuSel[item.id].html('bla-bla-bla'); //click(`console.log(123)`);

        });
        this.menuSel['opr']
            .html('home click')
            .click(`console.log(123)`);
    }

    click(itemId) {
        console.log('menu click id=' + itemId);

        this.$content.html('clicked id=' + itemId);
    }
}
