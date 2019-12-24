import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AuthComponent = class AuthComponent {
    constructor(route) {
        this.route = route;
    }
    ngOnInit() {
        this.route
            .queryParams
            .subscribe(queryParams => {
            console.log('Query Params:', queryParams);
            if (queryParams.path) {
                this.path = queryParams.path;
            }
            if (queryParams.mail) {
                this.status = 'confirm';
                this.token = queryParams.mail;
            }
        });
    }
    toggleTab(e) {
        this.path = e;
    }
};
AuthComponent = tslib_1.__decorate([
    Component({
        selector: 'app-auth',
        templateUrl: './auth.component.html',
        styleUrls: ['./auth.component.css']
    })
], AuthComponent);
export { AuthComponent };
//# sourceMappingURL=auth.component.js.map