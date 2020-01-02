import {Component, OnInit} from '@angular/core';
import {ListenerService, SocketApiService} from '@app/_services';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-nav-category',
  templateUrl: './nav-category.component.html',
  styleUrls: ['./nav-category.component.css']
})
export class NavCategoryComponent implements OnInit {

  categories: any[] = [];
  curCat: number;
  constructor(private listener: ListenerService, private route: ActivatedRoute, private sAPI: SocketApiService) {
    this.sAPI.getCategories();
    listener.$getEvent().subscribe(msg => {
      if (msg.categories) {
        this.categories = msg.categories;
      }
    });
    this.route
      .queryParams
      .subscribe(queryParams => {
        this.curCat = parseInt(queryParams.id, 10);
        console.log(queryParams, this.curCat);
      });
  }

  ngOnInit() {

  }

}
