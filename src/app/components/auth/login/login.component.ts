import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import {SocketApiService, ListenerService, AuthenticationService} from '@app/_services';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required, Validators.pattern('^[-a-z0-9!#$%&\'*+/=?^_`{|}~]+(?:\\.[-a-z0-9!#$%&\'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$')]),
    password: new FormControl('', [Validators.required])
  });
  returnUrl: string;
  sending: boolean;
  msg: string;

  constructor(
    private sAPI: SocketApiService,
    private listener: ListenerService,
    private cookie: CookieService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    if (localStorage.getItem('token')) {
      const curDate = JSON.parse(localStorage.getItem('token')).date;
      if (this.authenticationService.validateDate(curDate)) {
        this.router.navigate(['/cabinet']);
      }
    }
    listener.$putEvent().subscribe(msg => {
      console.log(msg);
      if (msg.auth_token) {
        this.sending = false;
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(msg.auth_token[0]));
        this.router.navigate(['/cabinet']);
      }
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  logIn() {
    this.sending = true;
    this.msg = '';
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService.login(this.f.email.value, this.f.password.value);
  }
}
