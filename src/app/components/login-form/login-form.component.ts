import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './../../login/login.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ServerConnectionService } from '../../server-connection/server-connection.service';
@Component({
  selector: 'bcon-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private login: LoginService, private server: ServerConnectionService) { }

  ngOnInit() { }

  loginUser(form: LoginForm) {
    this.server.logIn(form.login as string, form.password as string).subscribe(success => {
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