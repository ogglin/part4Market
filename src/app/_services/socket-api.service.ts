import {Injectable} from '@angular/core';
import io from 'socket.io-client';
import {Observable} from 'rxjs';

import {Event} from '../_models';
// @ts-ignore
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketApiService {
  private $put;
  private $get;

  public initSocket(): void {
    this.$put = io(environment.SERVER_URL_PUT);
    this.$get = io(environment.SERVER_URL_GET);
  }

  public sendGet(msg: any): void {
    this.$get.emit('get', msg);
  }

  public sendPut(msg: any): void {
    this.$put.emit('put', msg);
  }

  public listenerGet(): Observable<any> {
    return new Observable<any>(observer => {
      this.$get.on('get', (data: any) => observer.next(data));
    });
  }

  public listenerPut(): Observable<any> {
    return new Observable<any>(observer => {
      this.$put.on('put', (data: any) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<any>(observer => {
      this.$put.on(event, () => observer.next('_put'));
      this.$get.on(event, () => observer.next('_get'));
    });
  }

  public Search(val): void {
    this.$get.emit('get', '{"search":"' + val + '"}');
  }

  public sendMail(mail, subject, text, html) {
    this.$put.emit('put', '{"mail_send": true, "mail":"' + mail + '", "subject":"' + subject + '", ' +
      '"text":"' + text + '", "html":"' + html + '"}');
  }

  public sendReg(mail, password, login) {
    this.$put.emit('put', '{"mail_send_reg": true, "mail":"' + mail + '", "password":"' + password + '", "login":"' + login + '"}');
  }

  public sendAuthLogin(email, password) {
    this.$put.emit('put', '{"auth_email":"' + email + '", "auth_pass":"' + password + '"}');
  }

  public sendAuthToken(token) {
    this.$put.emit('put', '{"auth_token":"' + token + '"}');
  }

  public mailConfirm(token) {
    this.$put.emit('put', '{"mail_confirm":"' + token + '"}');
  }

  public getCategories(): void {
    this.$get.emit('get', '{"categories":"true"}');
  }

  public getAllGoods(): void {
    this.$get.emit('get', '{"goods":"true"}');
  }

  public getUserGoods(userId): void {
    this.$get.emit('get', '{"goods":"true","user_id":"' + userId + '"}');
  }

  public getGoods(catId): void {
    this.$get.emit('get', '{"goods":"true","cat_id":"' + catId + '"}');
  }

  public getTopGoods(): void {
    this.$get.emit('get', '{"topgoods":"true"}');
  }

  public getProduct(pId): void {
    this.$get.emit('get', '{"product":' + pId + '}');
  }

  public getBrands(): void {
    this.$get.emit('get', '{"brands":"true"}');
  }

  public getModels(brandId): void {
    this.$get.emit('get', '{"models":"' + brandId + '"}');
  }

  public putProduct(body): void {
    this.$put.emit('put', JSON.stringify(body));
  }

  constructor() {
  }
}
