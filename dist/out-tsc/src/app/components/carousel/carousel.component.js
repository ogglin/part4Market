import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let CarouselComponent = class CarouselComponent {
    constructor(listener, sAPI) {
        this.listener = listener;
        this.sAPI = sAPI;
        this.topGoods = [];
    }
    ngOnInit() {
        this.sAPI.getTopGoods();
        this.listener.$getEvent().subscribe(msg => {
            if (msg.topgoods) {
                this.topGoods = msg.topgoods;
            }
        });
    }
};
CarouselComponent = tslib_1.__decorate([
    Component({
        selector: 'app-carousel',
        templateUrl: './carousel.component.html',
        styleUrls: ['./carousel.component.css']
    })
], CarouselComponent);
export { CarouselComponent };
//# sourceMappingURL=carousel.component.js.map