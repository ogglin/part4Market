import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
let ListenerComponent = class ListenerComponent {
    constructor(sAPI, json) {
        this.sAPI = sAPI;
        this.json = json;
        this.event = new EventEmitter();
    }
    ngOnInit() {
        this.sAPI.initSocket();
        this.sAPI.listenerGet().subscribe(msg => {
            this.json.toJSON(msg).subscribe(obj => {
                console.log(obj);
                if (obj.categories) {
                    this.event.emit({ event: 'category', content: obj });
                }
                if (obj.search) {
                    this.event.emit({ event: 'search', content: obj });
                }
                if (obj.topgoods) {
                    this.event.emit({ event: 'topgoods', content: obj });
                }
                if (obj.goods) {
                    this.event.emit({ event: 'goods', content: obj });
                }
            });
        });
        this.sAPI.listenerPut().subscribe(msg => {
            this.json.toJSON(msg).subscribe(obj => {
                console.log(obj);
            });
        });
        this.sAPI.getCategories();
        this.sAPI.getTopGoods();
    }
};
tslib_1.__decorate([
    Output()
], ListenerComponent.prototype, "event", void 0);
ListenerComponent = tslib_1.__decorate([
    Component({
        selector: 'app-listener',
        templateUrl: './listener.component.html',
        styleUrls: ['./listener.component.css']
    })
], ListenerComponent);
export { ListenerComponent };
//# sourceMappingURL=listener.component.js.map