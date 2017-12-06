import { Component, OnInit } from '@angular/core';
import {ServerConnectionService} from "../../server-connection/server-connection.service";
import {Restaurant} from "../../model/restaurant";
import {MenuItem} from "../../model/menu-item";
import {SpinnerService} from "../../ui/spinner/spinner.service";
import {Router} from "@angular/router";

@Component({
  selector: 'bcon-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  restaurant: Restaurant = null;

  constructor(
    private serverConnectionService: ServerConnectionService,
    private spinner: SpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.spinner.start();
    this.serverConnectionService.getRestaurantDetails()
      .subscribe(restaurant => {
        this.restaurant = restaurant;
        this.spinner.stop();
      }, () => {
        this.router.navigate(["/login"]);
        this.spinner.stop();
      })
  }

  deleteItem(id: number) {
    this.restaurant.menu = this.restaurant.menu
      .filter(item => item.id != id);
  }

  addNew() {
    this.restaurant.menu.push(new MenuItem())
  }

  save() {
    this.spinner.start();
    this.serverConnectionService.updateRestaurantMenu(this.restaurant.menu)
      .subscribe(restaurant => {
        this.restaurant = restaurant;
        this.spinner.stop();
      });
  }
}
