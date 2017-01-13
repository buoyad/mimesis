import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { PoolService } from '../pool.service';
import { Pool, Stone, Schedule, Book } from '../pool';

@Component({
  selector: 'app-pool-creator',
  templateUrl: './pool-creator.component.html',
  styleUrls: ['./pool-creator.component.css']
})
export class PoolCreatorComponent implements OnInit {
  private owner: any = {};
  private pool: Pool = new Pool();

  constructor(
    private as: AuthService,
    private ps: PoolService
  ) { }

  ngOnInit() {
    this.as.getSignedInUser().subscribe(u => {
      this.owner = u;
      this.pool.admins.push(this.owner.username);
    });
  }

  private addStone(): void {
    this.pool.schedule.stones.push(new Stone());
  }

  private onSubmit(): void {

  }

}
