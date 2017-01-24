import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable, Subscription } from 'rxjs/Rx';

import { AuthService } from '../../auth/auth.service';
import { PoolService } from '../pool.service';
import { Pool, Stone, Message } from '../pool';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit, OnDestroy {
  private username: string;

  private poolKey: string;
  private pool: Pool;
  private stone: Stone;

  private sub: Subscription = new Subscription();
  private subs: Subscription[] = new Array<Subscription>();

  private comment: string;
  private threads: Message[][] = new Array<Array<Message>>();

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private ps: PoolService,
    private as: AuthService
  ) { }

  ngOnInit() {
    this.subs.push(this.as.getSignedInUser().subscribe(u => {
      this.username = u.username;
    }))
    Observable.zip(this.ar.parent.params, this.ps.selectedPool).subscribe(([parentParams, pool]) => {
      this.subs.push(this.ar.params.subscribe(params => { // TODO: Implement route reload strategies to be able to discard this subscription
        console.log('params changed')
        this.stone, this.comment = null;
        this.sub.unsubscribe();
        this.threads = new Array<Array<Message>>();
        console.log(params);
        this.poolKey = parentParams['id'];
        this.pool = pool;
        this.stone = pool.schedule.stones[params['stoneIndex']];
        this.sub = this.ps.getThreads(this.poolKey, this.stone.threads).subscribe(r => {
          console.log(r);
          this.threads = r.forEach((t, i) => {
            r[i] = Object.keys(t)
              .filter(p => (p.indexOf('$') === -1))
              .map(val => t[val]);
          });
          this.threads = r;
          console.log(this.threads);
        });
      }));
    })
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private submitReply($event, i): void {

  }

  private createThread($event): void {
    if ($event.keyCode === 13) {
      let msg: Message = {
        author: this.username,
        timestamp: new Date().toISOString(),
        content: this.comment
      };
      console.log(this.ps.addThread(this.poolKey, this.stone.threads, msg));
    }
  }

}
