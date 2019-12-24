import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import { share } from 'rxjs/operators';
// @ts-ignore
import {AuthenticationService} from '@app/_services';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  isLogin: boolean;
  constructor(private router: Router, private authenticationService: AuthenticationService) {
    if (localStorage.getItem('token')) {
      this.isLogin = true;
    }
  }

  ngOnInit() {
    this.authenticationService.validToken.subscribe(res => {
      console.log(res);
    });
  }

  goTo(e) {
    switch (e) {
      case 'profile': this.router.navigate(['cabinet'], { queryParams: { path: 'profile' } }); break;
      case 'classy': this.router.navigate(['cabinet'], { queryParams: { path: 'classy' } }); break;
      case 'addclassy': this.router.navigate(['cabinet'], { queryParams: { path: 'addclassy' } }); break;
      case 'reg': this.router.navigate(['auth'], { queryParams: { path: 'reg' } }); break;
      case 'login': this.router.navigate(['auth'], { queryParams: { path: 'login' } }); break;
      case 'logout': this.router.navigate(['auth'], { queryParams: { path: 'logout' } }); break;
    }
  }

}
