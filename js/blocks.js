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
            this.menuSel[item.id] = $(`<span id=${item.id}>${item.title}</span>`)
                .click(() => {
                    let id = item.id;
                    console.log(id);
                })
                .appendTo(this.$menu);
        });
    }

    click(itemId) {
        console.log('menu click id=' + itemId);
        this.menuSel[itemId].click();
        this.$content.html('clicked id=' + itemId);
    }
}