import { Observable, from, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import * as authActions from './auth.actions';
import { User } from './model/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {}

  getUser() {
    return this.afAuth.authState;
  }

  login(email: string, password: string): Observable<any> {
    const loginResult = this.afAuth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => this.handleErrorResponse(error));
    return from(loginResult);
  }

  register(email: string, password: string): Observable<any> {
    const registerResult = this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => this.handleErrorResponse(error));
    return from(registerResult);
  }

  sendPasswordResetEmail(email: string): Observable<any> {
    const result = this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => this.handlePwResetEmailSuccessResponse())
      .catch((error) => this.handleErrorResponse(error));
    return from(result);
  }

  sendVerificationEmail(): Observable<any> {
    const verifyEmailResult = this.afAuth.currentUser
      .then((user) =>
        user.sendEmailVerification({ url: 'http://localhost:4200/profile' })
      )
      .then(() => {
        this.snackBar.open(
          'A verification email was sent, please check your inbox',
          null,
          { duration: 3000 }
        );
      })
      .catch((error) => {
        this.snackBar.open(`${error.message}`, null, { duration: 3000 });
      });
    return from(verifyEmailResult);
  }

  updateDisplayName(displayName: string): Observable<any> {
    const updateUserProfileResult = this.afAuth.currentUser
      .then((user) => user.updateProfile({ displayName }))
      .then(() => {
        this.reloadCurrentUserInfo();
      })
      .catch((error) => {
        this.snackBar.open('Failed to update your profile', null, {
          duration: 3000,
        });
      });
    return from(updateUserProfileResult);
  }

  updatePhotoURL(photoURL: string): Observable<any> {
    const updateUserProfileResult = this.afAuth.currentUser
      .then((user) => user.updateProfile({ photoURL }))
      .then(() => {
        this.reloadCurrentUserInfo();
      })
      .catch((error) => {
        this.snackBar.open('Failed to update your profile', null, {
          duration: 3000,
        });
      });
    return from(updateUserProfileResult);
  }

  logout() {
    this.afAuth.signOut();
  }

  private handleErrorResponse(error) {
    const { code, message } = error;
    this.snackBar.open(`${message}`, null, { duration: 3000 });
  }

  private handlePwResetEmailSuccessResponse() {
    this.snackBar.open(
      'Reset password email sent, please check your inbox',
      null,
      { duration: 3000 }
    );
    this.router.navigate(['/login']);
  }

  private reloadCurrentUserInfo() {
    this.afAuth.currentUser.then((user) =>
      this.store.dispatch(
        authActions.authenticated({ payload: this.fromFirebaseUser(user) })
      )
    );
    this.snackBar.open('Your profile info has been updated', null, {
      duration: 3000,
    });
  }

  private fromFirebaseUser(firebaseUser): User {
    const { uid, displayName, email, phoneNumber, emailVerified, photoURL } =
      firebaseUser;
    return {
      uid,
      displayName,
      email,
      phoneNumber,
      emailVerified,
      photoURL,
    } as User;
  }
}
