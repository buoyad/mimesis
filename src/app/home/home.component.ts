import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'

import { Subscription } from 'rxjs/Rx';

import { AuthService } from '../auth/auth.service';
import { PoolService } from '../pools/pool.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private loaded: boolean = false;
  private signedIn: any;

  private sub: Subscription;

  constructor(
    private router: Router,
    private as: AuthService,
    private ps: PoolService
  ) { }

  ngOnInit() {
    this.sub = this.as.getSignedInUser().subscribe(d => {
      console.log(d);
      this.signedIn = d;
      this.loaded = true;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
