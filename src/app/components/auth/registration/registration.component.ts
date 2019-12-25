import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SocketApiService} from '../../../_services/socket-api.service';
import {ListenerService} from '../../../_services/listener.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnChanges {

  @Input() status: string;
  @Input() token: string;
  regForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('', [
      Validators.required, Validators.minLength(6)
    ]),
    repassword: new FormControl('', [
      Validators.required, Validators.minLength(6)
    ]),
    email: new FormControl('', [
      Validators.required, Validators.pattern('^[-a-z0-9!#$%&\'*+/=?^_`{|}~]+(?:\\.[-a-z0-9!#$%&\'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$')])
  });
  sending: boolean;
  msg: string;
  constructor(private sAPI: SocketApiService, private listener: ListenerService) {
    listener.$putEvent().subscribe(msg => {
      if (msg.mail_send_reg) {
        const obj = msg.mail_send_reg;
        console.log(obj);
        if (obj.status === 'user_id') {
          this.msg = 'Проверьте почту и подтвердите для завершения регистрации';
        } else if (obj.status === 'exist') {
          this.msg = 'Этот email уже используется';
        }
        this.sending = false;
        this.regForm.reset();
      }
      if (msg.mail_confirm) {
        this.sending = false;
        this.msg = '';
        this.msg = 'Email успешно подтвержден, войдите на сайт!';
      }
    });
  }

  ngOnChanges(change: SimpleChanges) {
    this.status = change.status.currentValue;
    this.token = change.token.currentValue;
    console.log(this.token);
    if (this.status === 'confirm') {
      this.sAPI.mailConfirm(this.token);
      this.sending = true;
    }
  }

  register() {
    this.sending = true;
    this.msg = '';
    this.sAPI.sendReg(this.regForm.controls.email.value, this.regForm.controls.password.value, this.regForm.controls.login.value);
  }
}
