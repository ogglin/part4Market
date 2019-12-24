import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SocketApiService} from '../../../_services/socket-api.service';
import {ToJsonService} from '../../../_services/to-json.service';

@Component({
  selector: 'app-listener',
  templateUrl: './listener.component.html',
  styleUrls: ['./listener.component.css']
})
export class ListenerComponent implements OnInit {

  @Output() event = new EventEmitter<any>();

  constructor(private sAPI: SocketApiService, private json: ToJsonService) {
  }

  ngOnInit() {
    this.sAPI.initSocket();
    this.sAPI.listenerGet().subscribe(msg => {
      this.json.toJSON(msg).subscribe(obj => {
          console.log(obj);
          if (obj.categories) {
            this.event.emit({event: 'category', content: obj});
          }
          if (obj.search) {
            this.event.emit({event: 'search', content: obj});
          }
          if (obj.topgoods) {
            this.event.emit({event: 'topgoods', content: obj});
          }
          if (obj.goods) {
            this.event.emit({event: 'goods', content: obj});
          }
        }
      );
    });
    this.sAPI.listenerPut().subscribe(msg => {
      this.json.toJSON(msg).subscribe(obj => {
        console.log(obj);
      });
    });
    this.sAPI.getCategories();
    this.sAPI.getTopGoods();
  }
}
