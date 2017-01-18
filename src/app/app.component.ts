import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire } from 'angularfire2';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mimesis';
  private username: string;

  constructor(
    private as: AuthService,
    private af: AngularFire,
    private router: Router
    ) { }

  ngOnInit() {
    this.af.auth.subscribe(a => {
      if (a != null) {
        let email = a.auth.email;
        this.as.getUserData(email).then(n => {
          this.username = n.username;
        })
      } else {
        this.username = null;
      }
    })
  }

  logout() {
    this.as.logout().then(() => {
      this.router.navigate(['/']);
    })
  }
}
