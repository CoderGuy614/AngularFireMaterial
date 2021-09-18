import { Observable, from, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MessageService } from '../services/MessageService';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private afAuth: AngularFireAuth,
              private flashMessages: MessageService,
              private router: Router,
              ) {}

  getUser() {
    return this.afAuth.authState;
  };

  sendPasswordResetEmail(email: string): Observable<any> {
    const result = this.afAuth.sendPasswordResetEmail(email)
    .then(() => this.handlePwResetEmailSuccessResponse())    
    .catch(error =>  this.handlePwResetErrorResponse(error));
    return from(result);
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

  sendVerificationEmail(): Observable<any> {
    const verifyEmailResult = this.afAuth.currentUser.then(user => user.sendEmailVerification({url: 'http://localhost:4200/email-verified'}))
    .then(() => {
      this.flashMessages.showMessage('A verification email was sent, please check your inbox', 'alert-success', 3000);
    })
    .catch(() => {
      this.flashMessages.showMessage('Could not verify your email address', 'alert-warning', 3000);
    })
    return from(verifyEmailResult);
  }
  
  logout() {
    this.afAuth.signOut();
  };

  private handlePwResetErrorResponse(error) {
    const { code, message }  = error;
    this.flashMessages.showMessage(`${message}`, 'alert-danger', 3000);
  };

  private handlePwResetEmailSuccessResponse() {
    this.flashMessages.showMessage('Email sent, please check your inbox', 'alert-success', 3000);
    this.router.navigate(['/login'])
  };

};
