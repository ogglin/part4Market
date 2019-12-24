import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, } from '@angular/material-moment-adapter';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
const nData = new Date();
nData.setDate(nData.getDate() - 60);
let DateIntervalComponent = class DateIntervalComponent {
    constructor(_adapter) {
        this._adapter = _adapter;
        this.data = new EventEmitter();
        this.startDate = new Date();
        this.start = new FormControl('');
        this.end = new FormControl(new Date());
    }
    ngOnInit() {
        this.startDate.setMonth(this.startDate.getMonth() - 2);
        this.start.setValue(this.startDate);
        this.setDate();
    }
    setDate() {
        const end = moment(this.end.value).add(1, 'd');
        let body;
        if (this.end.value instanceof Date) {
            body = {
                start: this.start.value.toISOString(),
                end: end.toISOString()
            };
        }
        else {
            body = {
                start: this.start.value.toISOString(),
                end: end.toISOString()
            };
        }
        this.data.emit(body);
    }
};
tslib_1.__decorate([
    Output()
], DateIntervalComponent.prototype, "data", void 0);
DateIntervalComponent = tslib_1.__decorate([
    Component({
        selector: 'app-date-interval',
        templateUrl: './date-interval.component.html',
        styleUrls: ['./date-interval.component.scss'],
        providers: [
            { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
            {
                provide: DateAdapter,
                useClass: MomentDateAdapter,
                deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
            },
            { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        ]
    })
], DateIntervalComponent);
export { DateIntervalComponent };
//# sourceMappingURL=date-interval.component.js.map