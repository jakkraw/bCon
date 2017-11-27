import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import { UpdateOrderEvent } from '../components/order-lists/order/order.component';
import { Settings } from './settings';
import { Order, Status } from './order';
import { LoginService } from '../login/login.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { SocketService } from './socket.service';

@Injectable()
export class ServerConnectionService {
  readonly jsonHeader = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }

  private restaurantId:number

  constructor(private http: Http, private loginService: LoginService,private socketService:SocketService) { }

  allOrders(): Observable<Order[]> {
    let url = Settings.allOrdersUrl;
    let authHeader = this.loginService.authHeader();
    let headers = new Headers(authHeader);
    let params = {
      'status': Status[Status.PENDING]
    }
    return this.http.get(url, {headers: headers, params: params}).map((r: Response) => {
      return r.json();
    });
  }

  updateOrder(event: UpdateOrderEvent): Observable<boolean> {
    let url = Settings.updateOrdersUrl+ "/" + event.id;
    let body = JSON.stringify(Status[event.status]);
    let authHeader = this.loginService.authHeader();
    let headers = new Headers(Object.assign(this.jsonHeader,authHeader));

    return this.http.put(url, body, {headers: headers}).map(r => r.status == 200);
  }

  logIn(login: string, password: string): Observable<boolean> {
    let url = Settings.LoginUrl;
    let authHeader = { "Authorization": "Basic " + Settings.AppBase64 };
    let headers =  new Headers(Object.assign(authHeader, this.jsonHeader))
    let params = {
      'grant_type': 'password',
      'username': login,
      'password': password
    };


    return this.http.post(url, {}, { headers: headers, params: params })
      .map(r => {
          if (r.status == 200) {
            this.loginService.setToken(r.json());
            return true;
          }
          else return false;
        }
      ).mergeMap(ok => {
        if(!ok) return Observable.of(ok);
        return this.getRestaurantId();
      })
  }

  getRestaurantId(): Observable<boolean> {
    let url = Settings.RestaurantInfo;
    let authHeader = this.loginService.authHeader();
    let headers = new Headers(Object.assign(authHeader, this.jsonHeader));
    return this.http.get(url, {headers: headers}).map((r: Response) => {
      this.restaurantId = r.json().id;
      return true;
    });
  }

  newOrderCallback(response) {
    if(this.restaurantId) {
      this.socketService.connect(this.restaurantId, response);
    } else {
      this.getRestaurantId().subscribe(() => {
        this.socketService.connect(this.restaurantId, response);
      })
    }
  }
}

