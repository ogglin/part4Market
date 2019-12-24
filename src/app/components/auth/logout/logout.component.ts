import { Component, OnInit } from '@angular/core';
// @ts-ignore
import {AuthenticationService} from '@app/_services';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {
    authenticationService.logout();
  }

  ngOnInit() {
  }

}
