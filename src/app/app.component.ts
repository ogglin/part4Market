import {Component, EventEmitter, Output} from '@angular/core';
import {ListenerService} from '@app/_services';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'part4Market';
  dark: boolean;
  @Output() event = new EventEmitter<any>();

  constructor(private listener: ListenerService, private cookie: CookieService) {
    this.dark = true;
    listener.$getEvent().subscribe(msg => {
      this.event.emit(msg);
    });
    listener.$putEvent().subscribe(msg => {
      this.event.emit(msg);
    });
  }
}
