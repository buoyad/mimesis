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

}
