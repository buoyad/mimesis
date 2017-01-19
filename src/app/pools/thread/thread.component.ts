import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { PoolService } from '../pool.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  private poolKey: string;
  private stoneIndex: string;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private ps: PoolService
  ) { }

  ngOnInit() {
    this.ar.parent.params.subscribe(p => this.poolKey = p['id'])
    this.ar.params
      .subscribe((params: Params) => this.stoneIndex = params['stoneIndex']);
    this.ps.selectedPool.subscribe(pool => console.log(pool));
  }

}
