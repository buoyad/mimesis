import { Component, OnInit } from '@angular/core';

import { SignupComponent } from './signup/signup.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public name: string;
  public email: string;
  public password: string;

  constructor(
    private as: AuthService
  ) { }

  ngOnInit() {
  }

  public signup(): void {
    this.as.signup(this.name, this.email, this.password);
  }

}
