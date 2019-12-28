import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '@environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnChanges {

  @Input() product: any;
  @Input() full: boolean;
  path = environment.pathUpload;

  constructor(private router: Router) {

  }

  ngOnChanges(change: SimpleChanges) {
    this.product = change.product.currentValue;
  }

  goToProduct() {
   this.router.navigate(['product'], { queryParams: { id: this.product.id } });
  }
}
