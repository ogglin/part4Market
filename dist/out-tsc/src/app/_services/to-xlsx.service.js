import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
let ToXlsxService = class ToXlsxService {
    constructor() {
    }
    exportAsExcelFile(json, excelFileName) {
        const worksheet = XLSX.utils.json_to_sheet(json);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }
    saveAsExcelFile(buffer, fileName) {
        const data = new Blob([buffer], { type: EXCEL_TYPE });
        const m = (parseInt(String(new Date().getMonth() + 1), 10));
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getDay() + '.' + m + '.' + new Date().getFullYear() + EXCEL_EXTENSION);
    }
};
ToXlsxService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ToXlsxService);
export { ToXlsxService };
//# sourceMappingURL=to-xlsx.service.js.map