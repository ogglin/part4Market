import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let NavCategoryComponent = class NavCategoryComponent {
    constructor(listener, sAPI) {
        this.listener = listener;
        this.sAPI = sAPI;
        this.categories = [];
        this.sAPI.getCategories();
        listener.$getEvent().subscribe(msg => {
            if (msg.categories) {
                this.categories = msg.categories;
            }
        });
    }
    ngOnInit() {
    }
};
NavCategoryComponent = tslib_1.__decorate([
    Component({
        selector: 'app-nav-category',
        templateUrl: './nav-category.component.html',
        styleUrls: ['./nav-category.component.css']
    })
], NavCategoryComponent);
export { NavCategoryComponent };
//# sourceMappingURL=nav-category.component.js.map