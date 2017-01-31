import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private as: AuthService,
    private router: Router
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Observable<boolean>(o => {
      this.as.getSignedInUser().subscribe(user => {
        if (!user) {
          o.next(true);
        } else {
          this.router.navigate([user.username]);
          o.next(false);
        }
      });
    });
  }

}
