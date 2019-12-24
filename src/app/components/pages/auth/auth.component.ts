import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  path: any;
  status: any;
  token: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(queryParams => {
        if (queryParams.path) {
          this.path = queryParams.path;
        }
        if (queryParams.mail) {
          this.status = 'confirm';
          this.token = queryParams.mail;
        }
      });
  }
  toggleTab(e) {
    this.path = e;
  }

}
