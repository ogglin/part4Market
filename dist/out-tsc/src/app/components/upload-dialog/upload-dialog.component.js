import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
let UploadDialogComponent = class UploadDialogComponent {
    constructor(uploadService) {
        this.uploadService = uploadService;
        this.images = new EventEmitter();
        this.files = new Set();
        this.canBeClosed = true;
        this.primaryButtonText = 'Загрузить на сервер';
        this.showCancelButton = true;
        this.uploading = false;
        this.uploadSuccessful = false;
    }
    ngOnInit() {
    }
    addFiles() {
        this.file.nativeElement.click();
    }
    onFilesAdded() {
        const files = this.file.nativeElement.files;
        const images = [];
        for (const key in files) {
            if (!isNaN(parseInt(key, 10))) {
                this.files.add(files[key]);
            }
        }
        this.files.forEach(f => {
            images.push(f.name);
        });
        this.images.emit(images);
    }
    closeDialog() {
        // if everything was uploaded already, just close the dialog
        if (this.uploadSuccessful) {
            this.success = 'Загружено';
        }
        // set the component state to "uploading"
        this.uploading = true;
        // start the upload and save the progress map
        this.progress = this.uploadService.upload(this.files);
        // convert the progress map into an array
        let allProgressObservables = [];
        // tslint:disable-next-line:forin
        for (const key in this.progress) {
            allProgressObservables.push(this.progress[key].progress);
        }
        // Adjust the state variables
        // The OK-button should have the text "Finish" now
        this.primaryButtonText = 'Готово';
        // The dialog should not be closed while uploading
        this.canBeClosed = false;
        this.success = 'Загружается';
        // Hide the cancel-button
        this.showCancelButton = false;
        // When all progress-observables are completed...
        forkJoin(allProgressObservables).subscribe(end => {
            // ... the dialog can be closed again...
            this.canBeClosed = true;
            this.success = 'Загружается';
            // ... the upload was successful...
            this.uploadSuccessful = true;
            // ... and the component is no longer uploading
            this.uploading = false;
        });
    }
};
tslib_1.__decorate([
    Output()
], UploadDialogComponent.prototype, "images", void 0);
tslib_1.__decorate([
    ViewChild('file', { static: false })
], UploadDialogComponent.prototype, "file", void 0);
UploadDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-upload-dialog',
        templateUrl: './upload-dialog.component.html',
        styleUrls: ['./upload-dialog.component.css']
    })
], UploadDialogComponent);
export { UploadDialogComponent };
//# sourceMappingURL=upload-dialog.component.js.map