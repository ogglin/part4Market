import {Component, OnInit} from '@angular/core';
import {ListenerService} from '../../_services/listener.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  search: any[] = [];
  products: any[] = [];
  path = '/assets/upload/';

  constructor(private listener: ListenerService, private router: Router) {
    listener.$getEvent().subscribe(msg => {
      if (msg.search) {
        this.search = msg.search;
        this.search.forEach(g => {
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
        console.log(this.products);
      }
    });
  }

  ngOnInit() {

  }

  goToProduct(pid) {
    this.router.navigate(['product'], { queryParams: { id: pid } });
  }

}
