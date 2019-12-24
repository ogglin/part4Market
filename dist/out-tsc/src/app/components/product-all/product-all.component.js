import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ProductAllComponent = class ProductAllComponent {
    constructor(listener, router, sAPI) {
        this.listener = listener;
        this.router = router;
        this.sAPI = sAPI;
        this.allgoods = [];
        this.products = [];
        this.path = '/assets/upload/';
        this.sAPI.getAllGoods();
        listener.$getEvent().subscribe(msg => {
            if (msg.allgoods) {
                this.allgoods = msg.allgoods;
                this.products = [];
                console.log(this.allgoods);
                this.allgoods.forEach(g => {
                    let imgs = [];
                    if (g.images) {
                        imgs = g.images.split(';');
                    }
                    else {
                        imgs.push('no-image.jpg');
                    }
                    this.products.push({
                        id: g.id,
                        title: g.title,
                        options: g.options,
                        price: g.price,
                        description: g.description,
                        images: imgs,
                        type: g.type,
                        address: g.address,
                        priority: g.priority,
                        category: g.category,
                        brand: g.brand,
                        model: g.model,
                        partcode: g.partcode
                    });
                });
            }
        });
    }
    ngOnInit() {
    }
    goToProduct(pid) {
        this.router.navigate(['product'], { queryParams: { id: pid } });
    }
};
ProductAllComponent = tslib_1.__decorate([
    Component({
        selector: 'app-product-all',
        templateUrl: './product-all.component.html',
        styleUrls: ['./product-all.component.css']
    })
], ProductAllComponent);
export { ProductAllComponent };
//# sourceMappingURL=product-all.component.js.map