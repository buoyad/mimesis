import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SignupComponent } from '../signup/signup.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userId: string;
  public password: string;

  constructor(
    private as: AuthService
  ) { }

  ngOnInit() {
  }

  public login(): void {
    this.as.login(this.userId, this.password).then(f => {
      console.log(f.auth);
    });
  }

}
