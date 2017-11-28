import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from "../../../model/menu-item";

@Component({
  selector: 'bcon-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  edit = false;

  @Input() menuItem: MenuItem;
  @Output() menuItemChange = new EventEmitter<MenuItem>();
  @Output() delete = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onMenuItemChange() {
    this.menuItemChange.next(this.menuItem);
    console.log("submit")
  }

  onDelete() {
    this.delete.next(this.menuItem.id);
  }

}
