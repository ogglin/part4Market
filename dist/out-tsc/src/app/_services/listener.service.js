import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
let ListenerService = class ListenerService {
    constructor(sAPI, json) {
        this.sAPI = sAPI;
        this.json = json;
        this.sAPI.initSocket();
    }
    $putEvent() {
        return new Observable(observer => {
            this.sAPI.listenerPut().subscribe(msg => {
                this.json.toJSON(msg).subscribe(obj => {
                    observer.next(obj);
                });
            });
        });
    }
    $getEvent() {
        return new Observable(observer => {
            this.sAPI.listenerGet().subscribe(msg => {
                this.json.toJSON(msg).subscribe(obj => {
                    observer.next(obj);
                });
            });
        });
    }
};
ListenerService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ListenerService);
export { ListenerService };
//# sourceMappingURL=listener.service.js.map