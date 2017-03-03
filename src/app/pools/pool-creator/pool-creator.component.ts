import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';
import { PoolService } from '../pool.service';
import { Pool, Stone, Schedule, Book } from '../pool';
import { AutocompleteDirective } from '../../shared/autocomplete.directive'

declare var $: any;

@Component({
  selector: 'app-pool-creator',
  templateUrl: './pool-creator.component.html',
  styleUrls: ['./pool-creator.component.scss']
})
export class PoolCreatorComponent implements OnInit {
  private owner: any = {};
  private pool: Pool = new Pool();
  private usernames: Array<{ 'title': string }>;
  private usernamePool: Array<{ 'title': string }>;
  private user: string = "";

  private createForm: FormGroup;

  /* UI message bindings */
  private searchPrompt: string = "Add users..."

  constructor(
    private as: AuthService,
    private ps: PoolService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      book: this.formBuilder.group({
        title: ['', [Validators.required]],
        author: '',
        pages: [null, Validators.required]
      }),
      schedule: this.formBuilder.array([
        this.initSchedule()
      ])
    });
    console.log(this.createForm)

    this.as.getSignedInUser().first().subscribe(u => {
      this.owner = u;
      this.pool.admins.push(this.owner.username);
      this.pool.addMember(this.owner.username);
    });
    this.as.getUsernames().subscribe(names => {
      this.usernames = names.map(name => {
        return { 'title': name }
      });
      this.usernamePool = this.usernames;
      this.initSearch();
    });
  }

  private initSchedule(): FormGroup {
    return this.formBuilder.group({
          heading: '',
          date: ['', Validators.required],
          page: [null, Validators.required]
        })
  }

  private initSearch(): void {
    $('.ui.search')
      .search({
        source: this.usernamePool,
        onSelect: (result, response)  => {
          this.user = result.title;
          this.addUser();
        }
      });
  }

  private addStone(): void {
    const schedule = <FormArray>this.createForm.controls['schedule'];
    schedule.push(this.initSchedule());
  }

  private addUser() {
    this.as.userExists(this.user).then(r => {
      if (r) {
        if (!this.pool.addMember(this.user)) {
          this.searchPrompt = "User already added!";
          setTimeout(() => {
            this.searchPrompt = "Add users...";
          }, 10000)
        } else {
          this.searchPrompt = "Add users...";
        }
        this.user = "";
      }
    });

    return false;
  }

  private onSubmit(): void {
    let holder = this.createForm.value;
    let startDate = holder.schedule[0].date;
    let endDate = holder.schedule[holder.schedule.length - 1].date;
    let sched: Schedule = {
      startDate: startDate,
      endDate: endDate,
      stones: holder.schedule
    };
    holder.schedule = sched;
    let mem = this.pool.members;
    this.pool = holder;
    this.pool.members = mem;
    this.pool.admins = this.owner.username;
    let newId: string = this.ps.storePool(this.pool);
    this.router.navigate(['/pool', newId]);
  }

  private test(i: HTMLInputElement): void {
    console.log(i);
    console.log(i instanceof HTMLInputElement)
  }

}
