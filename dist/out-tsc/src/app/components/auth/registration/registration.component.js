import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
let RegistrationComponent = class RegistrationComponent {
    constructor(sAPI, listener) {
        this.sAPI = sAPI;
        this.listener = listener;
        this.regForm = new FormGroup({
            login: new FormControl(''),
            password: new FormControl('', [
                Validators.required, Validators.minLength(6)
            ]),
            repassword: new FormControl('', [
                Validators.required, Validators.minLength(6)
            ]),
            email: new FormControl('', [
                Validators.required, Validators.pattern('^[-a-z0-9!#$%&\'*+/=?^_`{|}~]+(?:\\.[-a-z0-9!#$%&\'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$')
            ])
        });
        listener.$getEvent().subscribe(msg => {
            if (msg.mail_send_reg) {
                const obj = msg.mail_send_reg;
                console.log(obj);
                if (obj.status === 'user_id') {
                    this.msg = 'Проверьте почту и подтвердите для завершения регистрации';
                }
                else if (obj.status === 'exist') {
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
    ngOnChanges(change) {
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
};
tslib_1.__decorate([
    Input()
], RegistrationComponent.prototype, "status", void 0);
tslib_1.__decorate([
    Input()
], RegistrationComponent.prototype, "token", void 0);
RegistrationComponent = tslib_1.__decorate([
    Component({
        selector: 'app-registration',
        templateUrl: './registration.component.html',
        styleUrls: ['./registration.component.css']
    })
], RegistrationComponent);
export { RegistrationComponent };
//# sourceMappingURL=registration.component.js.map