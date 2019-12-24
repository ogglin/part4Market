import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
let AppComponent = class AppComponent {
    constructor(listener, cookie) {
        this.listener = listener;
        this.cookie = cookie;
        this.title = 'part4Market';
        this.event = new EventEmitter();
        this.dark = true;
        listener.$getEvent().subscribe(msg => {
            this.event.emit(msg);
        });
        listener.$putEvent().subscribe(msg => {
            this.event.emit(msg);
        });
    }
};
tslib_1.__decorate([
    Output()
], AppComponent.prototype, "event", void 0);
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map