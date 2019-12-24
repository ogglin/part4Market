import {Component, OnInit} from '@angular/core';
import {ListenerService} from '../../_services/listener.service';
import {SocketApiService} from '../../_services/socket-api.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  topGoods: any[] = [];
  constructor(private listener: ListenerService, private sAPI: SocketApiService) {}

  ngOnInit() {
    this.sAPI.getTopGoods();
    this.listener.$getEvent().subscribe(msg => {
      if (msg.topgoods) {
        this.topGoods = msg.topgoods;
      }
    });
  }

}
