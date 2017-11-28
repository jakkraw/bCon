import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../../../server-connection/order';

@Component({
  selector: 'bcon-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item:Item
  constructor() { }

  ngOnInit() {
  }

}
