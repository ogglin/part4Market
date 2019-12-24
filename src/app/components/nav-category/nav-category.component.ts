import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ListenerService} from '../../_services/listener.service';
import {SocketApiService} from '../../_services/socket-api.service';

@Component({
  selector: 'app-nav-category',
  templateUrl: './nav-category.component.html',
  styleUrls: ['./nav-category.component.css']
})
export class NavCategoryComponent implements OnInit {

  categories: any[] = [];
  constructor(private listener: ListenerService, private sAPI: SocketApiService) {
    this.sAPI.getCategories();
    listener.$getEvent().subscribe(msg => {
      if (msg.categories) {
        this.categories = msg.categories;
      }
    });
  }

  ngOnInit() {

  }

}
