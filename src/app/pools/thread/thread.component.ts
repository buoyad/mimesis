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
  private replies: string[] = new Array<string>();
  private threads: any = new Array<Array<Message>>();

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private ps: PoolService,
    private as: AuthService
  ) { }

  ngOnInit() {
    console.log('Initialized thread');
    this.subs.push(this.as.getSignedInUser().subscribe(u => {
      this.username = u.username;
    }))

    // this.ps.selectedPool.subscribe(pool => {
    //   this.pool = pool;
    //   this.poolKey = pool.$key;
    // })

    // this.ar.params.subscribe(params => {
    //   this.stone, this.comment = null;
    //   this.replies = new Array<string>();
    //   this.threads = new Array<Array<Message>>();
    //   while (!this.pool) { } // ratchet wait
    //   this.stone = this.pool.schedule.stones[params['stoneIndex']];
    //   this.sub = this.ps.getThreads(this.poolKey, this.stone.threads).subscribe(r => {
    //     this.threads = r;
    //     let rep = new Array<string>(r.length);
    //     this.replies.forEach((r, i) => rep[i] = r);
    //   });
    // })

    this.ps.selectedPool.subscribe((pool) => {
      console.log('retrieved pool', pool)
      this.subs.push(this.ar.params.subscribe(params => { // TODO: Implement route reload strategies to be able to discard this subscription
        console.log('params changed', params)
        this.stone, this.comment = null;
        this.sub.unsubscribe();
        this.threads = new Array<Array<Message>>();
        this.pool = pool;
        this.poolKey = pool.$key;
        this.stone = pool.schedule.stones[params['stoneIndex']];
        this.sub = this.ps.getThreads(this.poolKey, this.stone.threads).subscribe(r => {
          this.threads = r;
          let rep = new Array<string>(r.length);
          this.replies.forEach((r, i) => rep[i] = r);
        });
      }));
    })
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private submitReply($event, i): void {
    console.log(this.replies);
    if ($event.keyCode === 13) {
      $event.preventDefault();
      let msg: Message = {
        author: this.username,
        timestamp: new Date().toISOString(),
        content: this.replies[i]
      }
      this.replies[i] = "";
      this.ps.addMessage(this.poolKey, this.stone.threads, this.threads[i].$key, msg);
    }
  }

  private createThread($event): void {
    if ($event.keyCode === 13) {
      $event.preventDefault();
      let msg: Message = {
        author: this.username,
        timestamp: new Date().toISOString(),
        content: this.comment
      };
      this.comment = "";
      this.replies.push("");
      this.ps.addThread(this.poolKey, this.stone.threads, msg);
    }
  }

}
