import { Component, OnInit } from '@angular/core';
import {SocketApiService} from '../../_services/socket-api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ListenerService} from '../../_services/listener.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

  sendForm = new FormGroup({
    email: new FormControl('',
      [Validators.pattern('^[-a-z0-9!#$%&\'*+/=?^_`{|}~]+(?:\\.[-a-z0-9!#$%&\'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$'),
      Validators.required]),
    subject: new FormControl(''),
    text: new FormControl('', Validators.required)
  });
  sending: boolean;
  constructor(private sAPI: SocketApiService, private listener: ListenerService) {
    listener.$getEvent().subscribe(msg => {
      if (msg.mail_send) {
        this.sending = false;
        this.sendForm.reset();
      }});
  }

  ngOnInit() {
  }
  sendMail() {
    console.log(this.sendForm);
    this.sending = true;
    this.sAPI.sendMail(this.sendForm.controls.email.value, this.sendForm.controls.subject.value,
      this.sendForm.controls.text.value, this.sendForm.controls.text.value);
  }

}
