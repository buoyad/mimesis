import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SignupComponent } from '../signup/signup.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  get userId(): string {
    return this.loginForm.value['userId'];
  }

  get password() {
    return this.loginForm.value['password'];
  }

  private loginForm: FormGroup;

  constructor(
    private as: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login(): void {
    this.as.login(this.userId, this.password).then(f => {
      if (this.userId.indexOf('@') != -1) {
        this.as.getUserData(this.userId).then(res => this.router.navigate(['/', res.username]));
      } else {
        this.router.navigate(['/', this.userId]);
      }
    }).catch(e => {
      if (e.code) {
        console.log('Invalid password');
      } else {
        console.log('Username not found');
      }
    });
  }

}
