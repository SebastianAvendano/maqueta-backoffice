import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subject } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable()


export class AuthService {

  private _session: Subject<boolean> = new Subject();
  session$ = this._session.asObservable();


  constructor(
    private afAuth: AngularFireAuth
  ) {
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut()
  }

  getCurrentUser(): Observable<firebase.User | null> {
    return this.afAuth.user;
  }

  session(success: boolean){
    this._session.next(success);

  }

}
