import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private username: string;
  private email: string;
  private password: string;

  constructor(
    private as: AuthService
  ) { }

  ngOnInit() {

  }
  
  private signup() {
    this.as.signup(this.username, this.email, this.password).then(f => {
      console.log(f);
    });
  }

}
