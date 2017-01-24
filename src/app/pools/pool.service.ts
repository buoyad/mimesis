import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { Pool, Message } from './pool';
import { AuthService } from '../auth/auth.service';

import { AngularFire } from 'angularfire2';

@Injectable()
export class PoolService {
  public selectedPool = new Subject<Pool>();

  constructor(
    private af: AngularFire,
    private as: AuthService
  ) { }

  public storePool(p: Pool): string {
    const pools = this.af.database.list('/pools');
    const key = pools.push(p).key;
    p.members.forEach(u => this.as.addJoined(u, key));
    p.admins.forEach(u => this.as.addOwned(u, key));
    p.schedule.stones.forEach(stone => {
      const threads = this.af.database.list(`/threads/${key}`);
      stone.threads = threads.push({heading: stone.heading}).key;
    });
    const pool = this.af.database.object(`/pools/${key}`);
    pool.update(p);
    return key;
  }

  public getPool(key: string): Observable<Pool> {
    return new Observable<Pool>(o => {
      const pool = this.af.database.object(`/pools/${key}`);
      pool.subscribe(data => {
        o.next(data);
        this.selectedPool.next(data);
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
        data.schedule.stones.forEach(stone => this.deleteThread(key, stone.threads));
        pool.set(null);
      }
    });
  }

  public deleteThread(poolKey: string, threadKey: string) {
    const ref = this.af.database.object(`/threads/${poolKey}`);
    ref.set(null);
  }

  public addThread(poolKey: string, stoneKey: string, message: Message): string {
    const ref = this.af.database.list(`/threads/${poolKey}/${stoneKey}`).push({});
    ref.push(message);
    return ref.key;
  }

  public addMessage(poolKey: string, stoneKey: string, threadKey: string, message: Message): void {
    this.af.database.list(`/threads/${poolKey}/${stoneKey}/${threadKey}`).push(message);
  }

  getThreads(poolKey: string, stoneKey: string): Observable<any> {
    return new Observable<any>(o => {
      this.af.database.list(`/threads/${poolKey}/${stoneKey}`).subscribe( res => {
        o.next(res);
      })
    })
  }

}
