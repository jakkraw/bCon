import { Component, OnInit } from '@angular/core';
import { ServerConnectionService } from '../../server-connection/server-connection.service';
import { Order, Status } from '../../server-connection/order';
import { UpdateOrderEvent } from './order/order.component';
import {SpinnerService} from "../../ui/spinner/spinner.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-order-lists',
  templateUrl: './order-lists.component.html',
  styleUrls: ['./order-lists.component.css']
})
export class OrderListsComponent implements OnInit {

  orders: Order[] = [];

  constructor(
    private server: ServerConnectionService,
    private spinner: SpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.server.newOrderCallback(order =>{ this.orders.push(order)}); // add only distinct
    this.updateOrders();
  }

  updateOrders() {
    this.spinner.start();
    this.server.allOrders()
      .subscribe((orders: Order[]) => {
        this.orders = orders;
        this.spinner.stop();
      }, () => {
        this.router.navigate(["/login"]);
        this.spinner.stop();
      })
  }

  orderStatusChanged(event: UpdateOrderEvent) {
    this.server.updateOrder(event).subscribe(ok => {
      if(!ok) return;

      this.orders = this.orders.filter(item => item.id !== event.id);

    });
  }

}
