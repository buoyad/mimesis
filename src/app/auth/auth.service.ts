import { Injectable } from '@angular/core';

import { AngularFire, 
          FirebaseAuthState, 
          FirebaseListObservable,
        } from 'angularfire2';

@Injectable()
export class AuthService {
  private users: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) {
    this.users = af.database.list('/users');
   }

  public login(email: string, password: string): Promise<FirebaseAuthState> {
    return new Promise<FirebaseAuthState>((resolve, reject) => {
      this.af.auth.login({email: email, password: password}).then(f => resolve(f))
        .then(f => resolve(f))
        .catch(e => reject(e));
    });
  }

  public signup(username: string, email: string, password: string): Promise<FirebaseAuthState> {
    return new Promise<FirebaseAuthState>((resolve, reject) => {
      this.userExists(username).then(exists => {
        if (exists) {
          reject(new Error("Username exists"));
        } else {
        this.af.auth.createUser({email: email, password: password})
          .then(f => {
            resolve(f);
            this.sendEmail(f);
            this.generateRecord(username, email);
          })
          .catch(e => reject(e));
        }
      });
    });
  }

  private generateRecord(username: string, email: string) {
    const rec = this.af.database.object(`/users/${username}`);
    let record: any = {
      email: email
    };
    rec.set(record);
  }

  private sendEmail(user: FirebaseAuthState) {
    user.auth.sendEmailVerification();
  }

  private userExists(username: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const check = this.af.database.object(`/users/${username}`);
      check.subscribe(data => {
        if (data.$value != null) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

}
