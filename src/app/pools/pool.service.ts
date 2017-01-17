import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Pool } from './pool';
import { AuthService } from '../auth/auth.service';

import { AngularFire } from 'angularfire2';

@Injectable()
export class PoolService {

  constructor(
    private af: AngularFire,
    private as: AuthService
  ) { }

  public storePool(p: Pool): string {
    const pools = this.af.database.list('/pools');
    const key = pools.push(p).key;
    p.members.forEach(u => this.as.addJoined(u, key));
    p.admins.forEach(u => this.as.addOwned(u, key));
    return key;
  }

  public getPool(key: string): Observable<Pool> {
    return new Observable<Pool>(o => {
      const pool = this.af.database.object(`/pools/${key}`);
      pool.subscribe(data => {
        o.next(data);
        o.complete();
      });
    })
  }

  public deletePool(key: string): void {
    const pool = this.af.database.object(`/pools/${key}`);
    let sub = pool.first().subscribe(data => {
      if (data.$exists()) {
        data.members.forEach(m => this.as.removeJoined(m, key));
        data.admins.forEach(m => this.as.removeOwned(m, key));
        pool.set(null);
      }
    });
  }

}
