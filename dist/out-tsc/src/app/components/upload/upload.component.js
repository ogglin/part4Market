import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
let UploadComponent = class UploadComponent {
    constructor(dialog, uploadService) {
        this.dialog = dialog;
        this.uploadService = uploadService;
    }
    openUploadDialog() {
        const dialogRef = this.dialog.open(UploadDialogComponent, {
            width: '50%',
            height: '50%',
        });
    }
    ngOnInit() {
    }
};
UploadComponent = tslib_1.__decorate([
    Component({
        selector: 'app-upload',
        templateUrl: './upload.component.html',
        styleUrls: ['./upload.component.css']
    })
], UploadComponent);
export { UploadComponent };
//# sourceMappingURL=upload.component.js.map