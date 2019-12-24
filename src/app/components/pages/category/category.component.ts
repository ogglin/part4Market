import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {ListenerService, SocketApiService} from '@app/_services';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  catId: number;
  goods: any[] = [];
  products: any[] = [];
  path = '/assets/upload/';

  constructor(private sAPI: SocketApiService, private listener: ListenerService, private route: ActivatedRoute) {
    this.route
      .queryParams
      .subscribe(queryParams => {
        console.log('Query Params:', queryParams);
        this.catId = queryParams.id;
        this.sAPI.getGoods(this.catId);
        console.log(this.catId);
      });
    this.listener.$getEvent().subscribe(msg => {
      if (msg.goods) {
        this.products = msg.goods;
      }
    });
  }

  ngOnInit() {
  }

}
