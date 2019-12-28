import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
// @ts-ignore
import {ListenerService, SocketApiService, UploadService} from '@app/_services';

const y = new Date().getFullYear();
const m = new Date().getMonth();
const fpath = y + '/' + m + '/';

@Component({
  selector: 'app-product-add-form',
  templateUrl: './product-add-form.component.html',
  styleUrls: ['./product-add-form.component.css']
})
export class ProductAddFormComponent implements OnChanges {

  @ViewChild('file', {static: false}) file;
  @Input() isEdit: boolean;
  @Input() prodId: number;
  @Input() body: any;
  public files: Set<File> = new Set();
  brands: any[] = [];
  models: any[] = [];
  categories: any[] = [];
  progress;
  canBeClosed = true;
  primaryButtonText = 'Загрузить на сервер';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  success: string;
  saving = false;
  fBrands: Observable<any[]>;
  fModels: Observable<any[]>;
  fCategory: Observable<any[]>;
  bid: number = null;
  mid: number = null;
  cid: number = null;
  uid: number;
  images: any[] = [];
  formTitle = 'Добавить объявление';
  addForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl(null),
    desc: new FormControl(''),
    address: new FormControl(''),
    brand: new FormControl(''),
    model: new FormControl(''),
    category: new FormControl(''),
    partcode: new FormControl('')
  });

  constructor(private sAPI: SocketApiService, public uploadService: UploadService, private listener: ListenerService) {
    this.uid = JSON.parse(localStorage.getItem('user')).id;
    this.sAPI.getCategories();
    this.sAPI.getBrands();
    this.listener.$getEvent().subscribe(msg => {
      this.models = [];
      if (msg.brands) {
        this.brands = msg.brands;
      }
      if (msg.models) {
        this.models = msg.models;
      }
      if (msg.categories) {
        this.categories = msg.categories;
      }
      if (msg.putGoods) {
        this.saving = false;
        this.resetForm();
      }
    });
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.isEdit) {
      this.isEdit = change.isEdit.currentValue;
      if (this.isEdit) {
        this.formTitle = 'Редактировать объявление';
      } else {
        this.formTitle = 'Добавить объявление';
      }
    }
    if (change.prodId) {
      this.prodId = change.prodId.currentValue;
    }
    if (change.body) {
      this.body = change.body.currentValue[0];
      this.addForm.controls.title.setValue(this.body.title);
      this.addForm.controls.price.setValue(this.body.price);
      this.addForm.controls.desc.setValue(this.body.description);
      this.addForm.controls.address.setValue(this.body.address);
      this.addForm.controls.category.setValue(this.body.category);
      this.addForm.controls.partcode.setValue(this.body.partcode);
      this.addForm.controls.brand.setValue(this.body.brand);
      this.addForm.controls.model.setValue(this.body.model);
    }
    this.fCategory = this.addForm.controls.category.valueChanges
      .pipe(startWith(''), map(value => this._filter(value, this.categories)));
    this.fBrands = this.addForm.controls.brand.valueChanges
      .pipe(startWith(''), map(value => this._filter(value, this.brands)));
    this.fModels = this.addForm.controls.model.valueChanges
      .pipe(startWith(''), map(value => this._filter(value, this.models)));
  }

  private _filter(value: string, options: any): any[] {
    if (value === null) {
      value = '';
    }
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
      default:
        break;
    }
  }

  resetForm() {
    this.files = null;
    this.addForm.reset();
  }

  saveProduct() {
    this.files.forEach(f => {
      this.images.push(fpath + f.name);
    });
    const body = {
      putGoods: true,
      user_id: this.uid,
      title: this.addForm.controls.title.value,
      price: this.addForm.controls.price.value,
      description: this.addForm.controls.desc.value,
      images: this.images,
      address: this.addForm.controls.address.value,
      category_id: this.cid,
      brand_id: this.bid,
      model_id: this.mid,
      type: '',
      options: '',
      partcode: this.addForm.controls.partcode.value
    };
    this.sAPI.putProduct(body);
  }

  f() {
    return this.addForm.controls;
  }
  editProduct() {
    const f = this.f();
    this.files.forEach(fl => {
      this.images.push(fpath + fl.name);
    });
    if (f.category.value && f.category.value === '') {
      this.categories.forEach(cat => {
        if (cat.name === this.body.category) {
          this.cid = cat.id;
        }
      });
    }
    if (f.brand.value && f.brand.value === '') {
      this.brands.forEach(b => {
        if (b.name === this.body.brand) {
          this.bid = b.id;
        }
      });
    }
    if (f.model.value && f.model.value === '') {
      this.models.forEach(m => {
        if (m.name === this.body.model) {
          this.mid = m.id;
        }
      });
    }
    const body = {
      editGoods: true,
      prod_id: this.prodId,
      user_id: this.uid,
      title: this.addForm.controls.title.value,
      price: this.addForm.controls.price.value,
      description: this.addForm.controls.desc.value,
      images: this.images,
      address: this.addForm.controls.address.value,
      category_id: this.cid,
      brand_id: this.bid,
      model_id: this.mid,
      type: '',
      options: '',
      partcode: this.addForm.controls.partcode.value
    };
    this.sAPI.putProduct(body);
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  clearFiles(name) {
    this.files.forEach(file => {
      if (file.name === name) {
        this.files.delete(file);
      }
    });
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (const key in files) {
      if (!isNaN(parseInt(key, 10))) {
        this.files.add(files[key]);
      }
    }
  }

  uploadDialog() {
    if (this.files.size < 1) {
      if (this.isEdit) {
        this.editProduct();
      } else {
        this.saveProduct();
      }
    }
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      this.success = 'Загружено';
    }

    // set the component state to "uploading"
    this.uploading = true;
    this.saving = true;

    // start the upload and save the progress map
    this.progress = this.uploadService.upload(this.files);

    // convert the progress map into an array
    const allProgressObservables = [];
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
      if (this.isEdit) {
        this.editProduct();
      } else {
        this.saveProduct();
      }
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.success = 'Загружается';

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }
}
