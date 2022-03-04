import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  User,
  authState
} from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';
import { UserCredential } from 'firebase/auth';

@Injectable()


export class AuthService {

  private _session: Subject<boolean> = new Subject();
  session$ = this._session.asObservable();


  constructor(
    private auth: Auth
  ) {
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth)
  }

  signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  getCurrentUser(): Observable<User | null> {
    return authState(this.auth);
  }

  session(success: boolean) {
    this._session.next(success);
  }

  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email)
  }

}
