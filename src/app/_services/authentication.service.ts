import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

// @ts-ignore
import {User} from '@app/_models';
// @ts-ignore
import {SocketApiService} from '@app/_services/socket-api.service';
// @ts-ignore
import {ListenerService} from '@app/_services/listener.service';

import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentTokenSubject: BehaviorSubject<string>;
  public currentToken: Observable<string>;
  public validTokenSubject: BehaviorSubject<boolean>;
  public validToken: Observable<boolean>;

  constructor(private sAPI: SocketApiService,
              private listener: ListenerService,
              private cookie: CookieService,
              private router: Router,
              private http: HttpClient) {
    this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('token'));
    this.validTokenSubject = new BehaviorSubject<boolean>(false);
    this.currentToken = this.currentTokenSubject.asObservable();
    this.validToken = this.validTokenSubject.asObservable();
    this.validateToken();
    listener.$putEvent().subscribe(msg => {
      if (msg.auth_email) {
        if (msg.auth_email[0].authorize_login !== 'error') {
          const token = {
            code: msg.auth_email[0].authorize_login,
            date: new Date()
          };
          cookie.set('token', JSON.stringify(token));
          localStorage.setItem('token', JSON.stringify(token));
          this.currentTokenSubject.next(msg.auth_email[0].authorize_login);
          this.sAPI.sendAuthToken(msg.auth_email[0].authorize_login);
        }
      }
    });
  }

  public get currentUserValue(): string {
    return this.currentTokenSubject.value;
  }

  login(email: string, password: string) {
    this.sAPI.sendAuthLogin(email, password);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentTokenSubject.next(null);
    this.router.navigate(['/']);
  }

  public validateDate(d) {
    const n = new Date();
    const date = new Date(d);
    const interval = (n.getTime() - date.getTime()) / 86400000;
    if (interval < 1) {
      return true;
    }
  }

  public validateToken(): Observable<any> {
    if (localStorage.getItem('token')) {
      const token = JSON.parse(localStorage.getItem('token')).code;
      this.sAPI.sendAuthToken(token);
      return new Observable<any>(observer => {
        this.listener.$getEvent().subscribe(msg => {
          if (msg.auth_token && msg.auth_token[0].id !== null) {
            this.validTokenSubject.next(true);
            observer.next(true);
            console.log('true');
          } else if (msg.auth_token && msg.auth_token[0].id === null) {
            this.validTokenSubject.next(false);
            observer.next(false);
            console.log('false');
          }
        });
      });
    } else {
      return new Observable<any>(observer => {
        observer.next(false);
      });
    }
  }
}
