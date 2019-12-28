import {Component, OnInit} from '@angular/core';
import {ListenerService, SocketApiService, DataStandardizedService} from '@app/_services';
import {Router} from '@angular/router';
import {environment} from '@environments/environment';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent implements OnInit {

  products: any[] = [];
  path = environment.pathUpload;

  constructor(
    private listener: ListenerService,
    private router: Router,
    private sAPI: SocketApiService,
    private sData: DataStandardizedService) {
    this.sAPI.getAllGoods();
    listener.$getEvent().subscribe(msg => {
      if (msg.allgoods) {
        this.products = [];
        this.sData.standardizeProduct(msg.allgoods).subscribe(res => {
          this.products = res;
        });
      }
    });
  }

  ngOnInit() {
  }

  goToProduct(pid) {
    this.router.navigate(['product'], {queryParams: {id: pid}});
  }

}
