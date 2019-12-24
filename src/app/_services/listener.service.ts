import { Injectable } from '@angular/core';
import {SocketApiService} from './socket-api.service';
import {ToJsonService} from './to-json.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {
  constructor(private sAPI: SocketApiService, private json: ToJsonService) {
    this.sAPI.initSocket();
  }

  public $putEvent(): Observable<any> {
    return new Observable<any>(observer => {
      this.sAPI.listenerPut().subscribe(msg => {
        this.json.toJSON(msg).subscribe(obj => {
            observer.next(obj);
          }
        );
      });
    });
  }

  public $getEvent(): Observable<any> {
    return new Observable<any>(observer => {
      this.sAPI.listenerGet().subscribe(msg => {
        this.json.toJSON(msg).subscribe(obj => {
          observer.next(obj);
          }
        );
      });
    });
  }

}
