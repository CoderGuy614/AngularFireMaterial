import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './AuthService';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { AuthActions } from './action-types';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((u) => {
            const { email, uid } = u.user;
            return AuthActions.loginSuccess({
              user: { email: email, id: uid },
            });
          }),

          // Instead of this try to dispact an action to show the error message
          catchError(() => EMPTY)
        )
      )
    )
  );

  getAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getAuth),
      mergeMap(() =>
        this.authService
          .getAuth()
          .pipe(
            map((auth) => ({
              type: '[Auth API] Get Auth',
              payload: auth.email,
            }))
          )
      )
    )
  );
}
