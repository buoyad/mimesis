import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  get username(): string {
    return this.signupForm.value['username'];
  }

  get email(): string {
    return this.signupForm.value['email'];
  }

  get password(): string {
    return this.signupForm.value['password'];
  }

  private signupForm: FormGroup;
  private emailValReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private as: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', Validators.pattern(this.emailValReg)],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  
  private signup() {
    this.as.signup(this.username, this.email, this.password).then(f => {
      this.router.navigate(['/', this.username])
    }).catch(e => console.log(e));
  }

  private test() {
    console.log(this.signupForm);
  }

}
