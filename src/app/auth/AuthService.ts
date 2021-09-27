import { Observable, from, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MessageService } from '../services/MessageService';
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
  constructor(private afAuth: AngularFireAuth,
              private flashMessages: MessageService,
              private router: Router,
              private store: Store<AppState>,
              private snackBar: MatSnackBar
              ) {}

  getUser() {
    const authState = this.afAuth.authState;
    return authState;
  };

  login(email: string, password: string): Observable<any> {
    const loginResult = this.afAuth.signInWithEmailAndPassword(email, password)
    .catch(error => this.handlePwResetErrorResponse(error))
    return from(loginResult);
  };

  register(email: string, password: string): Observable<any> {
    const registerResult = this.afAuth.createUserWithEmailAndPassword(email, password)
    .catch(error =>  this.handlePwResetErrorResponse(error));
    return from(registerResult);
  };

  sendPasswordResetEmail(email: string): Observable<any> {
    const result = this.afAuth.sendPasswordResetEmail(email)
    .then(() => this.handlePwResetEmailSuccessResponse())    
    .catch(error =>  this.handlePwResetErrorResponse(error));
    return from(result);
  };

  sendVerificationEmail(): Observable<any> {
    const verifyEmailResult = this.afAuth.currentUser.then(user => user.sendEmailVerification({url: 'http://localhost:4200/email-verified'}))
    .then(() => {
      this.flashMessages.showMessage('A verification email was sent, please check your inbox', 'alert-success', 3000);
    })
    .catch(() => {
      this.flashMessages.showMessage('Could not verify your email address', 'alert-warning', 3000);
    })
    return from(verifyEmailResult);
  };

  updateDisplayName(displayName:string): Observable<any> {
    const updateUserProfileResult = this.afAuth.currentUser.then(user => user.updateProfile({ displayName }))
    .then(() => {
      this.reloadCurrentUserInfo();
    })
    .catch(() => {
      this.flashMessages.showMessage('Failed to update your profile', 'alert-warning', 3000);
    })
    return from(updateUserProfileResult);
  };

  updatePhotoURL(photoURL:string): Observable<any> {
    const updateUserProfileResult = this.afAuth.currentUser.then(user => user.updateProfile({ photoURL }))
    .then(() => {
      this.reloadCurrentUserInfo();
    })
    .catch(() => {
      this.flashMessages.showMessage('Failed to update your profile', 'alert-warning', 3000);
    })
    return from(updateUserProfileResult);
  };
  
  
  logout() {
    this.afAuth.signOut();
  };

  private handlePwResetErrorResponse(error) {
    const { code, message }  = error;
    this.snackBar.open(`${message}`, null, { duration: 2500 });
    // this.flashMessages.showMessage(`${message}`, 'alert-danger', 3000);
  };

  private handlePwResetEmailSuccessResponse() {
    this.flashMessages.showMessage('Email sent, please check your inbox', 'alert-success', 3000);
    this.router.navigate(['/login'])
  };

  private reloadCurrentUserInfo() {
    this.afAuth.currentUser.then(user => this.store.dispatch(authActions.authenticated({ payload: this.fromFirebaseUser(user) })) )
      this.flashMessages.showMessage('Your profile info has been updated', 'alert-success', 3000);
  };

  private fromFirebaseUser(firebaseUser): User {
    const { uid, displayName, email, phoneNumber, emailVerified, photoURL } = firebaseUser;
    const user = { uid, displayName, email, phoneNumber, emailVerified, photoURL } as User;
    return user;
  };



};
