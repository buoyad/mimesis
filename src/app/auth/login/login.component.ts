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
    private as: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
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
