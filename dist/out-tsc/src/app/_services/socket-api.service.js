import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';
const SERVER_URL_GET = 'https://localhost:443/get';
const SERVER_URL_PUT = 'https://localhost:443/put';
/*const SERVER_URL_GET = 'https://api.part4.info:443/get';
const SERVER_URL_PUT = 'https://api.part4.info:443/put';*/
/*const SERVER_URL_GET = 'https://dev.api.part4.info:443/get';
const SERVER_URL_PUT = 'https://dev.api.part4.info:443/put';*/
let SocketApiService = class SocketApiService {
    constructor() {
    }
    initSocket() {
        this.$put = io(SERVER_URL_PUT);
        this.$get = io(SERVER_URL_GET);
    }
    sendGet(msg) {
        this.$get.emit('get', msg);
    }
    sendPut(msg) {
        this.$put.emit('put', msg);
    }
    listenerGet() {
        return new Observable(observer => {
            this.$get.on('get', (data) => observer.next(data));
        });
    }
    listenerPut() {
        return new Observable(observer => {
            this.$put.on('put', (data) => observer.next(data));
        });
    }
    onEvent(event) {
        return new Observable(observer => {
            this.$put.on(event, () => observer.next('_put'));
            this.$get.on(event, () => observer.next('_get'));
        });
    }
    Search(val) {
        this.$get.emit('get', '{"search":"' + val + '"}');
    }
    sendMail(mail, subject, text, html) {
        this.$put.emit('put', '{"mail_send": true, "mail":"' + mail + '", "subject":"' + subject + '", ' +
            '"text":"' + text + '", "html":"' + html + '"}');
    }
    sendReg(mail, password, login) {
        this.$put.emit('put', '{"mail_send_reg": true, "mail":"' + mail + '", "password":"' + password + '", "login":"' + login + '"}');
    }
    sendAuthLogin(email, password) {
        this.$put.emit('put', '{"auth_email":"' + email + '", "auth_pass":"' + password + '"}');
    }
    sendAuthToken(token) {
        this.$put.emit('put', '{"token":"' + token + '"}');
    }
    mailConfirm(token) {
        this.$put.emit('put', '{"mail_confirm":"' + token + '"}');
    }
    getCategories() {
        this.$get.emit('get', '{"categories":"true"}');
    }
    getAllGoods() {
        this.$get.emit('get', '{"goods":"true"}');
    }
    getGoods(catId) {
        this.$get.emit('get', '{"goods":"true","cat_id":"' + catId + '"}');
    }
    getTopGoods() {
        this.$get.emit('get', '{"topgoods":"true"}');
    }
    getBrands() {
        this.$get.emit('get', '{"brands":"true"}');
    }
    getModels(brandId) {
        this.$get.emit('get', '{"_models":"' + brandId + '"}');
    }
};
SocketApiService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], SocketApiService);
export { SocketApiService };
//# sourceMappingURL=socket-api.service.js.map