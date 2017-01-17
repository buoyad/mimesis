import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Pool } from '../pool';
import { PoolService } from '../pool.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.css']
})
export class PoolComponent implements OnInit {
  private id: string;
  private pool: Pool;
  private signedIn: any;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private ps: PoolService,
    private as: AuthService
  ) { }

  ngOnInit() {
    this.ar.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        let sub = this.ps.getPool(this.id).first().subscribe((p: Pool) => {
          this.pool = p;
        });
    });
    this.as.getSignedInUser().subscribe(data => {
      this.signedIn = data;
      console.log(this.signedIn);
    });
  }

  private delete() {
    this.router.navigate(['/']);
    this.ps.deletePool(this.id);
  }

}
