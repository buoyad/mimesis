import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  private viewSignUpp: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
