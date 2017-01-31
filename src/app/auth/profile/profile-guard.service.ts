import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from '../auth.service';

@Injectable()
export class ProfileGuard implements CanActivate {

  constructor(
    private as: AuthService,
    private router: Router
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.as.userExists(route.params['username']).then(res => {
        if (res) {
          resolve(true);
        } else {
          this.router.navigate(['page-not-found']);
          resolve(false);
        }
      })
    })
  }

}
