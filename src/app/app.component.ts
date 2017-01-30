import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire } from 'angularfire2';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MIMESIS';
  private username: string;

  constructor(
    private as: AuthService,
    private af: AngularFire,
    private router: Router
    ) { }

  ngOnInit() {
    this.as.getSignedInUser().subscribe(user => {
      this.username = user ? user.username : user;
    })
  }

  logout() {
    this.as.logout().then(() => {
      this.router.navigate(['/login']);
    })
  }
}
