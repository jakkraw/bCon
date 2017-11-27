import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../login/login.service";

@Component({
  selector: 'bcon-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private login: LoginService
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.login.logOut();
  }
}
