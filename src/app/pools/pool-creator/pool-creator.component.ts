import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { PoolService } from '../pool.service';
import { Pool, Stone, Schedule, Book } from '../pool';
import { AutocompleteDirective } from '../../shared/autocomplete.directive'

@Component({
  selector: 'app-pool-creator',
  templateUrl: './pool-creator.component.html',
  styleUrls: ['./pool-creator.component.css']
})
export class PoolCreatorComponent implements OnInit {
  private owner: any = {};
  private pool: Pool = new Pool();
  private usernames;
  private user: string = "";

  constructor(
    private as: AuthService,
    private ps: PoolService,
    private router: Router
  ) { }

  ngOnInit() {
    this.as.getSignedInUser().subscribe(u => {
      this.owner = u;
      this.pool.admins.push(this.owner.username);
    });
    this.usernames = this.as.getUsernames();
  }

  private addStone(): void {
    this.pool.schedule.stones.push(new Stone());
  }

  private addUser(e: any) {
    if (e.keyCode === 13) {
      this.as.userExists(this.user).then(r => {
        console.log(r);
        if (r) {
          this.pool.addMember(this.user);
        }
      })
    }
  }

  private onSubmit(): void {
    let newId: string = this.ps.storePool(this.pool);
    this.router.navigate(['/pool', newId]);
  }

}
