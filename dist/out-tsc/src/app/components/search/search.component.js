import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let SearchComponent = class SearchComponent {
    constructor(sAPI) {
        this.sAPI = sAPI;
        this.searchValue = '';
    }
    ngOnInit() {
    }
    $Search(e) {
        console.log(e);
        this.sAPI.Search(e);
        if (e === '') {
            this.sAPI.getAllGoods();
        }
    }
};
SearchComponent = tslib_1.__decorate([
    Component({
        selector: 'app-search',
        templateUrl: './search.component.html',
        styleUrls: ['./search.component.css']
    })
], SearchComponent);
export { SearchComponent };
//# sourceMappingURL=search.component.js.map