import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { AuthService } from '../../auth/auth.service';
import { PoolService } from '../pool.service';
import { Pool, Stone, Message } from '../pool';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  private username: string;

  private poolKey: string;
  private pool: Pool;
  private stone: Stone;

  private comment: string;
  private threads: Message[][] = new Array<Array<Message>>();

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private ps: PoolService,
    private as: AuthService
  ) { }

  ngOnInit() {
    this.as.getSignedInUser().subscribe(u => {
      this.username = u.username;
    })
    Observable.zip(this.ar.parent.params, this.ps.selectedPool).subscribe(([parentParams, pool]) => {
      this.ar.params.subscribe(params => { // TODO: Implement route reload strategies to be able to discard this subscription
        this.stone, this.comment = null;
        this.threads = new Array<Array<Message>>();
        console.log(params);
        this.poolKey = parentParams['id'];
        this.pool = pool;
        this.stone = pool.schedule.stones[params['stoneIndex']];
        this.ps.getThreads(this.poolKey, this.stone.threads).subscribe(r => {
          console.log(r);
          this.threads = r.forEach((t, i) => {
            r[i] = Object.keys(t)
              .filter(p => p.indexOf('$') === -1)
              .map(val => t[val]);
          });
          this.threads = r;
          console.log(this.threads);
        });
      });
    })
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
