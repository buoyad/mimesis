import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { AuthService } from '../auth/auth.service';
import { PoolService } from '../pools/pool.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private loaded: boolean = false;
  private signedIn: any;

  constructor(
    private router: Router,
    private as: AuthService,
    private ps: PoolService
  ) { }

  ngOnInit() {
    this.as.getSignedInUser().subscribe(d => {
      this.signedIn = d;
      this.loaded = true;
    });
  }

}
