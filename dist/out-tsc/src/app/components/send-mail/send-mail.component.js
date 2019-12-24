import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
let SendMailComponent = class SendMailComponent {
    constructor(sAPI, listener) {
        this.sAPI = sAPI;
        this.listener = listener;
        this.sendForm = new FormGroup({
            email: new FormControl('', [Validators.pattern('^[-a-z0-9!#$%&\'*+/=?^_`{|}~]+(?:\\.[-a-z0-9!#$%&\'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$'),
                Validators.required]),
            subject: new FormControl(''),
            text: new FormControl('', Validators.required)
        });
        listener.$getEvent().subscribe(msg => {
            if (msg.mail_send) {
                this.sending = false;
                this.sendForm.reset();
            }
        });
    }
    ngOnInit() {
    }
    sendMail() {
        console.log(this.sendForm);
        this.sending = true;
        this.sAPI.sendMail(this.sendForm.controls.email.value, this.sendForm.controls.subject.value, this.sendForm.controls.text.value, this.sendForm.controls.text.value);
    }
};
SendMailComponent = tslib_1.__decorate([
    Component({
        selector: 'app-send-mail',
        templateUrl: './send-mail.component.html',
        styleUrls: ['./send-mail.component.css']
    })
], SendMailComponent);
export { SendMailComponent };
//# sourceMappingURL=send-mail.component.js.map