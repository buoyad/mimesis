import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

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

  public login(userId: string, password: string): Promise<FirebaseAuthState> {
    if (userId.indexOf('@') != -1) {
      return new Promise<FirebaseAuthState>((resolve, reject) => {
        this.af.auth.login({email: userId, password: password}).then(f => resolve(f))
          .then(f => resolve(f))
          .catch(e => reject(e));
      });
    } else {
      return new Promise<FirebaseAuthState>((resolve, reject) => {
        this.af.database.object(`users/${userId}`).subscribe(u => {
          console.log(u);
          if (u != null) {            
          this.af.auth.login({email: u.email, password: password}).then(f => resolve(f))
            .then(f => resolve(f))
            .catch(e => reject(e));
          }
          else {
            reject(new Error('Username does not exist.'));
          }
        });
      });
    }
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

  public getUserData(email: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const db = this.af.database.list('/users', {
        query: {
          orderByChild: 'email',
          equalTo: email
        }
      });
      let sub = db.subscribe(u => {
        let user = u[0];
        user.username = user.$key;
        delete user.$key;
        resolve(user);
        sub.unsubscribe();
      });
    });
  }

  public getSignedInUser(): Observable<any> {
    return new Observable<any>((o) => {
      this.af.auth.subscribe(f => {
        this.getUserData(f.auth.email).then(val => {
          o.next(val);
        })
      })
    });
  }

  public getUsernames(): Observable<string[]> {
    return new Observable<string[]>(o => {
      this.af.database.list('/names').subscribe(val => {
        o.next(val.map(v => v.$value));
        o.complete();
      })
    })
  }

  public addOwned(user: string, key: string): void {
    const owned = this.af.database.list(`/users/${user}/owned`);
    owned.push(key);
  }

  public addJoined(user: string, key: string): void {
    const joined = this.af.database.list(`/users/${user}/joined`);
    joined.push(key);
  }

  public getOwned(user: string): Observable<string[]> {
    return new Observable<string[]>(o => {
      const owned = this.af.database.list(`/users/${user}/owned`);
      owned.subscribe((data) => {
        o.next(data.map(d => d.$value));
      })
    })
  }

  public getJoined(user: string): Observable<string[]> {
    return new Observable<string[]>(o => {
      const owned = this.af.database.list(`/users/${user}/joined`);
      owned.subscribe((data) => {
        o.next(data.map(d => d.$value));
      })
    })
  }

  private generateRecord(username: string, email: string) {
    const rec = this.af.database.object(`/users/${username}`);
    let record: any = {
      email: email
    };
    rec.set(record);
    this.af.database.list('/emails').push(email);
    this.af.database.list('/names').push(username)
  }

  private sendEmail(user: FirebaseAuthState) {
    this.af.auth.getAuth().auth.sendEmailVerification().then(a => {
      console.log(a);
    }).catch(e => {
      console.log(e);
    });
  }

  public userExists(username: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const check = this.af.database.object(`/users/${username}`);
      check.subscribe(data => {
        if (data.$exists()) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

}
