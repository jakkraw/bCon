import { Component, OnInit } from '@angular/core';
import { ServerConnectionService } from '../../server-connection/server-connection.service';
import { Order, Status } from '../../server-connection/order';
import { UpdateOrderEvent } from './order/order.component';


@Component({
  selector: 'app-order-lists',
  templateUrl: './order-lists.component.html',
  styleUrls: ['./order-lists.component.css']
})
export class OrderListsComponent implements OnInit {

  orders: Order[] = [];

  constructor(private server: ServerConnectionService) { }

  ngOnInit() {
    this.server.newOrderCallback(order =>{ this.orders.push(order)})// add only distinct
    this.updateOrders();
  }

  updateOrders() {
    //TODO: keep subscriptions in variables, delete on destructor
    this.server.allOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
    })
  }

  orderStatusChanged(event: UpdateOrderEvent) {
    this.server.updateOrder(event).subscribe(ok => { 
      if(!ok) return;

      this.orders = this.orders.filter(item => item.id !== event.id);
 
     });
  }

}