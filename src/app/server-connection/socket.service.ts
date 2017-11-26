import { Injectable } from '@angular/core';
import { WebSocketService } from 'angular2-websocket-service'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/share';
import { Settings } from './settings';
import { StompService } from 'ng2-stomp-service';

@Injectable()
export class SocketService {

  constructor(private stomp: StompService) {
    stomp.configure({
      host:Settings.WebsocketEndpoint,
      debug:true,
      queue:{'init':false}
    });



  }

  public connect(restaurantId:number,response) {
    this.stomp.startConnect().then(() => {
      this.stomp.done('init');
      console.log('connected');

      this.stomp.subscribe('/topic/orders/'+restaurantId, response);
    })
  }

  public response = (data) => {
    console.log(data)
  }
}
