import {Component, Input, OnInit} from '@angular/core';
import {SocketApiService} from '@app/_services/socket-api.service';
import {ListenerService} from '@app/_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  mails: any[];

  constructor(private sAPI: SocketApiService, private listener: ListenerService) {
    this.listener.$getEvent().subscribe(msg => {
      if (msg.mail_send) {
        this.mails = [];
        this.mails = msg.mail_send;
      }
    });
  }

  ngOnInit() {
  }

}
