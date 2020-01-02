import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {DataStandardizedService, ListenerService, SocketApiService} from '@app/_services';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  catId: number;
  products: any[] = [];
  path = '/assets/upload/';

  constructor(private sAPI: SocketApiService,
              private listener: ListenerService,
              private route: ActivatedRoute,
              private sData: DataStandardizedService) {
    this.route
      .queryParams
      .subscribe(queryParams => {
        this.catId = queryParams.id;
        this.sAPI.getGoods(this.catId);
      });
    this.listener.$getEvent().subscribe(msg => {
      if (msg.goods) {
        this.sData.standardizeProduct(msg.goods).subscribe(res => {
          this.products = res;
        });
      }
    });
  }

  ngOnInit() {
  }

}
