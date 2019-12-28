import {Component, OnInit} from '@angular/core';
import {DataStandardizedService, ListenerService, SocketApiService} from '@app/_services/';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  topGoods: any[] = [];
  responsiveOptions: any;
  constructor(private listener: ListenerService, private sAPI: SocketApiService, private sData: DataStandardizedService) {
    this.responsiveOptions = [
      {
        breakpoint: '1366px',
        numVisible: 4,
        numScroll: 4
      },
      {
        breakpoint: '1200px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '800px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
    this.sAPI.getTopGoods();
    this.listener.$getEvent().subscribe(msg => {
      if (msg.topgoods) {
        this.sData.standardizeProduct(msg.topgoods).subscribe(res => {
          this.topGoods = res;
        });
      }
    });
  }

}
