import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
let LoginComponent = class LoginComponent {
    constructor(sAPI, listener, cookie, router) {
        this.sAPI = sAPI;
        this.listener = listener;
        this.cookie = cookie;
        this.router = router;
        this.loginForm = new FormGroup({
            email: new FormControl('', [
                Validators.required, Validators.pattern('^[-a-z0-9!#$%&\'*+/=?^_`{|}~]+(?:\\.[-a-z0-9!#$%&\'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$')
            ]),
            password: new FormControl('', [Validators.required])
        });
        listener.$getEvent().subscribe(msg => {
            if (msg.auth_email) {
                this.sending = false;
                if (msg.auth_email[0].authorize_login !== 'error') {
                    cookie.set('token', msg.auth_email[0].authorize_login);
                    this.router.navigate(['cabinet'], { queryParams: { path: 'profile' } });
                }
                else {
                    console.log(msg.auth_email[0].authorize_login);
                    this.msg = 'Не верный email или пароль';
                    console.log(this.msg);
                }
            }
        });
    }
    ngOnInit() {
    }
    logIn() {
        this.sending = true;
        this.msg = '';
        this.sAPI.sendAuthLogin(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map