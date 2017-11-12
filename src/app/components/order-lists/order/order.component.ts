import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Order, Status } from './../../../server-connection/order';

@Component({
  selector: 'bcon-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() order: Order;
  @Output() statusChange = new EventEmitter<UpdateOrderEvent>();

  constructor() { }
  ngOnInit() {
    console.log(this.order)
   }

  acceptOrder(): void {
    this.statusChange.emit(new UpdateOrderEvent(Status.DONE, this.order.id));
  }

  cancelOrder(): void {
    this.statusChange.emit(new UpdateOrderEvent(Status.CANCELLED, this.order.id));
  }

  get orderStatus(): string {
    return this.order.status.toString();
  }

}

export class UpdateOrderEvent {
  constructor(status: Status, id: number) {
    this.status = status;
    this.id = id;
  }
  status: Status;
  id: number;
}

