import {Component, OnInit} from '@angular/core';
import {ListenerService} from '../../_services/listener.service';
import {Router} from '@angular/router';
import {SocketApiService} from '../../_services/socket-api.service';

// @ts-ignore
import {environment} from '@environments/environment';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent implements OnInit {

  allgoods: any[] = [];
  products: any[] = [];
  path = environment.pathUpload;

  constructor(private listener: ListenerService, private router: Router, private sAPI: SocketApiService) {
    this.sAPI.getAllGoods();
    listener.$getEvent().subscribe(msg => {
      if (msg.allgoods) {
        this.allgoods = msg.allgoods;
        this.products = [];
        console.log(this.allgoods);
        this.allgoods.forEach(g => {
          let imgs = [];
          if (g.images) {
            imgs = g.images.split(';');
          } else {
            imgs.push('no-image.jpg');
          }
          this.products.push({
            id: g.id,
            title: g.title,
            options: g.options,
            price: g.price,
            description: g.description,
            images: imgs,
            type: g.type,
            address: g.address,
            priority: g.priority,
            category: g.category,
            brand: g.brand,
            model: g.model,
            partcode: g.partcode
          });
        });
      }
    });
  }

  ngOnInit() {
  }

  goToProduct(pid) {
    this.router.navigate(['product'], {queryParams: {id: pid}});
  }

}
