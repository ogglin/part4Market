import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnChanges {

  @Input() images: any[];
  curImg: number;
  allImg: number;
  constructor() { }

  ngOnChanges(change: SimpleChanges) {
    if (change.images) {
      this.images = change.images.currentValue;
      this.allImg = this.images.length - 1;
    }
    this.curImg = 0;
  }

  next() {
    if (this.curImg < this.allImg) {
      this.curImg = this.curImg + 1;
    }
  }
  prev() {
    if (this.curImg > 0) {
      this.curImg = this.curImg - 1;
    }
  }
  set(id) {
    this.curImg = id;
  }
}
