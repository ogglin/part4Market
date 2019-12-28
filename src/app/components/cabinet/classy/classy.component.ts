import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ListenerService, SocketApiService} from '@app/_services';

@Component({
  selector: 'app-classy',
  templateUrl: './classy.component.html',
  styleUrls: ['./classy.component.css']
})
export class ClassyComponent implements OnChanges {

  @Input() cmp: string;
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

  ngOnChanges(change: SimpleChanges) {
    console.log(change);
    if (change.cmp.currentValue) {
      this.cmp = change.cmp.currentValue;
      if (this.cmp === 'list') {
        this.isEdit = false;
      }
    }
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
