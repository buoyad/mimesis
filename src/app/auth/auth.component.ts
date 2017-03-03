import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  private viewSignUp: boolean = false;

  constructor() { }

  ngOnInit() {
    let body = document.getElementsByTagName('body')[0];
    body.style.overflowY = 'hidden';
  }

  ngOnDestroy() {
    let body = document.getElementsByTagName('body')[0];
    body.style.overflowY = 'auto';
  }

}
