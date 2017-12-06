import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './../../login/login.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ServerConnectionService } from '../../server-connection/server-connection.service';
import {SpinnerService} from "../../ui/spinner/spinner.service";
@Component({
  selector: 'bcon-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private login: LoginService,
    private server: ServerConnectionService,
    private spinner: SpinnerService
  ) { }

  ngOnInit() {
    this.login.logOut();
  }

  loginUser(form: LoginForm) {
    this.spinner.start();

    this.server.logIn(form.login as string, form.password as string)
      .subscribe(success => {
          this.spinner.stop();

          if (success)
            this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/');
        }
      );

  }
}

interface LoginForm {
  login: String;
  password: String;
}
