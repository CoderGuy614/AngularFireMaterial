import { AuthService } from './AuthService';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, mapTo, switchMap } from 'rxjs/operators';
import * as actions from './auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { AngularFireAuth } from '@angular/fire/auth';
import { MessageService } from '../services/MessageService';
import { User } from './model/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private flashMessages: MessageService,
    private store: Store<AppState>,
    private snackBar: MatSnackBar

  ) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getUser),
      exhaustMap((action) =>
        this.afAuth.authState.pipe(
          map((firebaseUser) => {
            if(firebaseUser) {
              return actions.authenticated({ payload: this.fromFirebaseUser(firebaseUser) })
            } else { 
              return actions.notAuthenticated();
            }
          }
          )
        ) 
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.login),
      exhaustMap(action =>
        this.authService.login(action.payload.email, action.payload.password).pipe(
          map(user => {
            if(user) {
              const { uid, displayName, email, phoneNumber, emailVerified, photoURL } = user.user;
              this.snackBar.open('Login was successful!', null, { duration: 2500 })
              // this.flashMessages.showMessage('Login was successful!', 'alert-success', 3000);
              return actions.authenticated({ payload: { uid, displayName, email, phoneNumber, emailVerified, photoURL } })
            } else {
              return actions.notAuthenticated();
            }
          }),
          catchError(error => of(actions.authError({ payload: error })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.register),
      exhaustMap(action =>
        this.authService.register(action.payload.email, action.payload.password).pipe(
          map(user => {
            if(user) {
              const { uid, displayName, email, phoneNumber, emailVerified, photoURL } = user.user;
              this.authService.sendVerificationEmail();
              this.snackBar.open('Login was successful!', null, { duration: 2500 })
              // this.flashMessages.showMessage('Account was successfully created!', 'alert-success', 3000);
              return actions.authenticated({ payload: { uid, displayName, email, phoneNumber, emailVerified, photoURL } })
            } else {
              return actions.notAuthenticated();
            }
          }),
          catchError(error => of(actions.authError({ payload: error })))
        )
      )
    )
  );

  sendPasswordResetEmail$ = createEffect(() =>
  this.actions$.pipe(
    ofType(actions.sendPasswordResetEmail),
    exhaustMap(action =>
      this.authService.sendPasswordResetEmail(action.payload.email).pipe(
        map(() => {
            return actions.sendPasswordResetEmailSuccess()
        }),
        catchError(error => of(actions.sendPasswordResetEmailFail())))
      )
    )
  );

  updateDisplayName$ = createEffect(() =>
  this.actions$.pipe(
    ofType(actions.updateDisplayName),
    exhaustMap(action =>
      this.authService.updateDisplayName(action.payload).pipe(
        map(() => {
            return actions.updateProfileSuccess()
        }),
        catchError(error => of(actions.updateProfileFail())))
      )
    )
  );

  updatePhotoURL$ = createEffect(() =>
  this.actions$.pipe(
    ofType(actions.updatePhotoURL),
    exhaustMap(action =>
      this.authService.updatePhotoURL(action.payload).pipe(
        map(() => {
            return actions.updateProfileSuccess()
        }),
        catchError(error => of(actions.updateProfileFail())))
      )
    )
  );

  private fromFirebaseUser(firebaseUser): User {
    const { uid, displayName, email, phoneNumber, emailVerified, photoURL } = firebaseUser;
    const user = { uid, displayName, email, phoneNumber, emailVerified, photoURL } as User;
    return user;
  };

};