import {Component, OnInit} from '@angular/core';
import {SocketApiService} from '../../_services/socket-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  searchValue = '';
  constructor(private sAPI: SocketApiService) { }

  ngOnInit() {
  }

  $Search(e) {
    console.log(e);
    this.sAPI.Search(e);
    if (e === '') {
      this.sAPI.getAllGoods();
    }
  }
}
