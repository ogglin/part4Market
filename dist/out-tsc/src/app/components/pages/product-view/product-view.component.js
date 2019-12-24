import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ProductViewComponent = class ProductViewComponent {
    constructor(route) {
        this.route = route;
    }
    ngOnInit() {
        this.route
            .queryParams
            .subscribe(queryParams => {
            console.log('Query Params:', queryParams);
            this.id = queryParams.id;
            console.log(this.id);
        });
        this.route
            .params
            .subscribe(params => {
            console.log('Regular Params:', params);
        });
    }
};
ProductViewComponent = tslib_1.__decorate([
    Component({
        selector: 'app-product-view',
        templateUrl: './product-view.component.html',
        styleUrls: ['./product-view.component.css']
    })
], ProductViewComponent);
export { ProductViewComponent };
//# sourceMappingURL=product-view.component.js.map