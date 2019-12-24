import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let TopMenuComponent = class TopMenuComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    goTo(e) {
        switch (e) {
            case 'profile':
                this.router.navigate(['cabinet'], { queryParams: { path: 'profile' } });
                break;
            case 'classy':
                this.router.navigate(['cabinet'], { queryParams: { path: 'classy' } });
                break;
            case 'addclassy':
                this.router.navigate(['cabinet'], { queryParams: { path: 'addclassy' } });
                break;
            case 'reg':
                this.router.navigate(['auth'], { queryParams: { path: 'reg' } });
                break;
            case 'login':
                this.router.navigate(['auth'], { queryParams: { path: 'login' } });
                break;
            case 'logout':
                this.router.navigate(['auth'], { queryParams: { path: 'logout' } });
                break;
        }
    }
};
TopMenuComponent = tslib_1.__decorate([
    Component({
        selector: 'app-top-menu',
        templateUrl: './top-menu.component.html',
        styleUrls: ['./top-menu.component.css']
    })
], TopMenuComponent);
export { TopMenuComponent };
//# sourceMappingURL=top-menu.component.js.map