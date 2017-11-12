import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UpdateOrderEvent } from '../components/order-lists/order/order.component';
import { Settings } from './settings';
import { Order, Status } from './order';
import { LoginService } from '../login/login.service';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable()
export class ServerConnectionService {
  readonly jsonHeader = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }

  constructor(private http: Http, private loginService: LoginService) { }

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
      );
  }

  testCredentials(): Observable<boolean> {
    let url = Settings.testCredentialsUrl;
    let authHeader = this.loginService.authHeader();
    let headers = new Headers(Object.assign(authHeader, this.jsonHeader));
    return this.http.get(url, { headers: headers }).map(r => {
      if (r.status == 200) {
        return true;
      }
      else return false;
    }
    );
  }

}
