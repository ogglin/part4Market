import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let SearchResultComponent = class SearchResultComponent {
    constructor(listener, router) {
        this.listener = listener;
        this.router = router;
        this.search = [];
        this.products = [];
        this.path = '/assets/upload/';
        listener.$getEvent().subscribe(msg => {
            if (msg.search) {
                this.search = msg.search;
                this.search.forEach(g => {
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
                console.log(this.products);
            }
        });
    }
    ngOnInit() {
    }
    goToProduct(pid) {
        this.router.navigate(['product'], { queryParams: { id: pid } });
    }
};
SearchResultComponent = tslib_1.__decorate([
    Component({
        selector: 'app-search-result',
        templateUrl: './search-result.component.html',
        styleUrls: ['./search-result.component.css']
    })
], SearchResultComponent);
export { SearchResultComponent };
//# sourceMappingURL=search-result.component.js.map