import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
// @ts-ignore
import {ListenerService, SocketApiService} from '@app/_services';
import {environment} from '@environments/environment';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  $id: Observable<any>;
  id: any;
  product: any;
  img: any[] = [];
  path = environment.pathUpload;

  constructor(private route: ActivatedRoute, private sAPI: SocketApiService, private listener: ListenerService) {
    listener.$getEvent().subscribe(msg => {
      if (msg.product) {
        this.product = msg.product[0];
        console.log(this.product);
        if (this.product.images) {
          const imgs = this.product.images.split(';');
          imgs.forEach(i => {
            this.img.push(this.path + i.trim());
          });
        } else {
          this.img.push('/assets/img/no-image.jpg');
        }
      }
    });
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(queryParams => {
        console.log('Query Params:', queryParams);
        this.id = queryParams.id;
        this.sAPI.getProduct(this.id);
      });
    this.route
      .params
      .subscribe(params => {
        console.log('Regular Params:', params);
      });
  }
}
