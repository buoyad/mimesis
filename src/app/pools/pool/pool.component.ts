import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Pool } from '../pool';
import { PoolService } from '../pool.service';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.css']
})
export class PoolComponent implements OnInit {
  private id: string;
  private pool: Pool;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private ps: PoolService
  ) { }

  ngOnInit() {
    this.ar.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.ps.getPool(this.id).subscribe((p: Pool) => {
          this.pool = p;
        });
    });
  }

}
