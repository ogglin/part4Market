import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '@app/_services';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  isLogin: boolean;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.validToken.subscribe(res => {
      console.log(res);
    });
    this.authenticationService.isGetLogin.subscribe(e => {
      console.log(e);
      this.isLogin = e;
    });
    if (localStorage.getItem('token')) {
      this.isLogin = true;
    }
  }

  ngOnInit() {
  }

  goTo(e) {
    switch (e) {
      case 'profile':
        this.router.navigate(['cabinet'], {queryParams: {tab: 'profile'}});
        break;
      case 'classy':
        this.router.navigate(['cabinet'], {queryParams: {tab: 'classy', cmp: 'list'}});
        break;
      case 'addclassy':
        this.router.navigate(['cabinet'], {queryParams: {tab: 'addclassy'}});
        break;
      case 'reg':
        this.router.navigate(['auth'], {queryParams: {path: 'reg'}});
        break;
      case 'login':
        this.router.navigate(['auth'], {queryParams: {path: 'login'}});
        break;
      case 'logout':
        this.router.navigate(['auth'], {queryParams: {path: 'logout'}});
        break;
    }
  }

}
