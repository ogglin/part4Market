import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
let ProductAddFormComponent = class ProductAddFormComponent {
    constructor(sAPI) {
        this.sAPI = sAPI;
        this.brands = [];
        this.models = [];
        this.categories = [];
        this.images = [];
        this.addForm = new FormGroup({
            title: new FormControl(''),
            price: new FormControl(null),
            desc: new FormControl(''),
            address: new FormControl(''),
            brand: new FormControl(''),
            model: new FormControl(''),
            category: new FormControl('')
        });
    }
    ngOnInit() {
        this.fCategory = this.addForm.controls.category.valueChanges
            .pipe(startWith(''), map(value => this._filter(value, this.categories)));
        this.fBrands = this.addForm.controls.brand.valueChanges
            .pipe(startWith(''), map(value => this._filter(value, this.brands)));
        this.fModels = this.addForm.controls.model.valueChanges
            .pipe(startWith(''), map(value => this._filter(value, this.models)));
    }
    _filter(value, options) {
        const filterValue = value.toLowerCase();
        return options.filter(option => option.name.toLowerCase().includes(filterValue));
    }
    setVal(e, id) {
        switch (e) {
            case 'bid':
                this.bid = id;
                this.sAPI.getModels(id);
                break;
            case 'mid':
                this.mid = id;
                break;
            case 'cid':
                this.cid = id;
                break;
            default: break;
        }
    }
    setImages(e) {
        console.log(e);
        this.images = e;
    }
    saveProduct() {
        const body = {
            title: this.addForm.controls.title.value,
            price: this.addForm.controls.price.value,
            description: this.addForm.controls.desc.value,
            images: this.images,
            address: this.addForm.controls.address.value,
            category: this.cid,
            brand: this.bid,
            model: this.mid
        };
        console.log(body);
    }
};
tslib_1.__decorate([
    Input()
], ProductAddFormComponent.prototype, "brands", void 0);
tslib_1.__decorate([
    Input()
], ProductAddFormComponent.prototype, "models", void 0);
tslib_1.__decorate([
    Input()
], ProductAddFormComponent.prototype, "categories", void 0);
ProductAddFormComponent = tslib_1.__decorate([
    Component({
        selector: 'app-product-add-form',
        templateUrl: './product-add-form.component.html',
        styleUrls: ['./product-add-form.component.css']
    })
], ProductAddFormComponent);
export { ProductAddFormComponent };
//# sourceMappingURL=product-add-form.component.js.map