import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { AuthService } from '../auth.service';
import { PoolService } from '../../pools/pool.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private username: string;
  private owned: Array<{key: string, val: string}>;
  private joined: Array<{key: string, val: string}>;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private ps: PoolService,
    private as: AuthService
  ) { }

  ngOnInit() {
    this.ar.params.subscribe((params: Params) => {
      this.username = params['username'];
      this.as.getOwned(this.username).subscribe(data => {
        this.owned = new Array<{key: string, val: string}>();
        data.forEach(d => {
          this.ps.getPool(d).subscribe(p => {
            this.owned.push({key: d, val: p.name});
          });
        });
      });
      this.as.getJoined(this.username).subscribe(data => {
        this.joined = new Array<{key: string, val: string}>();
        data.forEach(d => {
          this.ps.getPool(d).subscribe(p => {
            this.joined.push({key: d, val: p.name});
          });
        });
      });
    });
  }

}
