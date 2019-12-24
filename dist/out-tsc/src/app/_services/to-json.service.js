import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
let ToJsonService = class ToJsonService {
    constructor() {
    }
    toJSON(message) {
        return new Observable(observer => {
            if (/^[\],:{}\s]*$/.test(message
                .replace(/\\["\\\/bfnrtu]/g, '@')
                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                observer.next(JSON.parse(message));
            }
            else {
                observer.next(message);
            }
        });
    }
};
ToJsonService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ToJsonService);
export { ToJsonService };
//# sourceMappingURL=to-json.service.js.map