import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let CabinetComponent = class CabinetComponent {
    constructor(sAPI, listener, route) {
        this.sAPI = sAPI;
        this.listener = listener;
        this.route = route;
        this.tab = 'profile';
        this.brands = [];
        this.models = [];
        this.categories = [];
        this.mails = [];
        this.route
            .queryParams
            .subscribe(queryParams => {
            console.log('Query Params:', queryParams);
            this.tab = queryParams.path;
            console.log(this.tab);
        });
        this.opened = true;
        this.sAPI.getBrands();
        this.sAPI.getCategories();
        this.listener.$getEvent().subscribe(msg => {
            this.brands = [];
            this.models = [];
            this.categories = [];
            if (msg.brands) {
                this.brands = msg.brands;
            }
            if (msg.models) {
                this.models = msg.models;
            }
            if (msg.categories) {
                this.categories = msg.categories;
            }
            if (msg.mail_send) {
                this.mails = msg.mail_send;
            }
        });
    }
    ngOnInit() {
    }
    toggleTab(e) {
        this.tab = e;
    }
};
CabinetComponent = tslib_1.__decorate([
    Component({
        selector: 'app-cabinet',
        templateUrl: './cabinet.component.html',
        styleUrls: ['./cabinet.component.css']
    })
], CabinetComponent);
export { CabinetComponent };
//# sourceMappingURL=cabinet.component.js.map