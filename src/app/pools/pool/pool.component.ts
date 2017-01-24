import { Component, OnInit, ViewChild, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Pool } from '../pool';
import { ThreadComponent } from '../thread/thread.component';
import { PoolService } from '../pool.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.css']
})
export class PoolComponent implements OnInit {
  private id: string;
  private pool: Pool;
  private signedIn: any;

  @ViewChild(ThreadComponent) threadRef: ComponentRef<ThreadComponent>;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private ps: PoolService,
    private as: AuthService
  ) { }

  ngOnInit() {
    this.ar.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        let sub = this.ps.getPool(this.id).first().subscribe((p: Pool) => {
          this.pool = p;
        });
    });
    this.as.getSignedInUser().subscribe(data => {
      this.signedIn = data;
    });
  }

  private delete() {
    this.router.navigate(['/']);
    this.ps.deletePool(this.id);
  }

  private initThread(stoneNo: number) {
    this.ps.selectedPool.next(this.pool);
    // if (this.threadRef) {
    //   this.threadRef.destroy();
    // }
    // this.router.navigate([stoneNo], { relativeTo: this.ar });
  }

}
