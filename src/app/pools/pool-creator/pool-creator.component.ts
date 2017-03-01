import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  private usernames;
  private user: string = "";

  private createForm: FormGroup;

  constructor(
    private as: AuthService,
    private ps: PoolService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required]
    });

    this.as.getSignedInUser().first().subscribe(u => {
      this.owner = u;
      this.pool.admins.push(this.owner.username);
      this.pool.addMember(this.owner.username);
    });
    this.as.getUsernames().subscribe(names => {
      this.usernames = names.map(name => {
        return { 'title': name }
      });
      this.initSearch();
    });
  }

  private initSearch(): void {
    $('.ui.search')
      .search({
        source: this.usernames,
        onSelect: ()  => this.addUser()
      });
  }

  private addStone(): void {
    this.pool.schedule.stones.push(new Stone());
  }

  private addUser() {
    this.as.userExists(this.user).then(r => {
      if (r) {
        this.pool.addMember(this.user);
        this.user = "";
      }
    });
    return false;
  }

  private onSubmit(): void {
    let newId: string = this.ps.storePool(this.pool);
    this.router.navigate(['/pool', newId]);
  }

}
