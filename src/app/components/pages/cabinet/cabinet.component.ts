import {Component, OnInit} from '@angular/core';
import {SocketApiService} from '../../../_services/socket-api.service';
import {ListenerService} from '../../../_services/listener.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {

  opened: boolean;
  tab = 'profile';

  constructor(private sAPI: SocketApiService, private listener: ListenerService, private route: ActivatedRoute, private router: Router) {
    this.route
      .queryParams
      .subscribe(queryParams => {
        console.log('Query Params:', queryParams);
        this.tab = queryParams.path;
        console.log(this.tab);
      });
    this.opened = true;
  }

  ngOnInit() {
  }

  toggleTab(e) {
    switch (e) {
      case 'profile':
        this.router.navigate(['cabinet'], {queryParams: {path: 'profile'}});
        break;
      case 'classy':
        this.router.navigate(['cabinet'], {queryParams: {path: 'classy'}});
        break;
      case 'addclassy':
        this.router.navigate(['cabinet'], {queryParams: {path: 'addclassy'}});
        break;
    }
  }

}
