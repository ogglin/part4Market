import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let ProductCardComponent = class ProductCardComponent {
    constructor(router) {
        this.router = router;
        this.full = false;
        this.imgs = [];
        this.path = '/assets/upload/';
    }
    ngOnChanges(change) {
        this.product = change.product.currentValue;
        if (this.product.images) {
            this.setImages(this.product.images);
        }
        else {
            this.image = '/assets/img/no-image.jpg';
        }
    }
    setImages(images) {
        this.imgs = images.split(';');
        this.image = this.path + this.imgs[0];
    }
    goToProduct() {
        this.full = !this.full;
        /*this.router.navigate(['product'], { queryParams: { id: this.product.id } });*/
    }
};
tslib_1.__decorate([
    Input()
], ProductCardComponent.prototype, "product", void 0);
tslib_1.__decorate([
    Input()
], ProductCardComponent.prototype, "full", void 0);
ProductCardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-product-card',
        templateUrl: './product-card.component.html',
        styleUrls: ['./product-card.component.css']
    })
], ProductCardComponent);
export { ProductCardComponent };
//# sourceMappingURL=product-card.component.js.map