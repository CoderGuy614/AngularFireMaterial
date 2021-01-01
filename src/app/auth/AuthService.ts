import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  getAuth() {
    return this.afAuth.authState.pipe(map((auth) => auth));
  }

  logout() {
    this.afAuth.signOut();
  }
}
