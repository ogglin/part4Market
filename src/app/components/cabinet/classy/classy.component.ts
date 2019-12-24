import {Component, OnInit} from '@angular/core';
import {ListenerService, SocketApiService} from '@app/_services';

@Component({
  selector: 'app-classy',
  templateUrl: './classy.component.html',
  styleUrls: ['./classy.component.css']
})
export class ClassyComponent implements OnInit {

  uid: number;
  userProducts: any[] = [];
  isEdit = false;
  prodId: number;
  body: any;

  constructor(private sAPI: SocketApiService, private listener: ListenerService) {
    this.uid = JSON.parse(localStorage.getItem('user')).id;
    this.sAPI.getUserGoods(this.uid);
    listener.$getEvent().subscribe(msg => {
      if (msg.usergoods) {
        this.userProducts = msg.usergoods;
        console.log(this.userProducts);
      }
    });
  }

  ngOnInit() {
  }

  refresh() {
    this.sAPI.getUserGoods(this.uid);
  }
  edit(id) {
    this.prodId = id;
    this.isEdit = true;
    this.body = this.userProducts.filter(p => p.id === id);
    console.log(id);
  }

  delete(id) {
    console.log(id);
  }
}
