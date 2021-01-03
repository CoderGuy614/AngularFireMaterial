import { getAuth } from './../auth.actions';
import { login } from '../auth.actions';
import { AuthService } from '../AuthService';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { noop, Observable } from 'rxjs';
import { AppState } from '../../reducers';
import { Store, select } from '@ngrx/store';

import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthActions } from '../action-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      email: ['jonny@gmail.com', [Validators.required]],
      password: ['123456', [Validators.required]],
    });
  }

  // ngOnInit() {
  //   this.authService.getAuth().subscribe((auth) => {
  //     if (auth) {
  //       this.router.navigate(['/']);
  //     }
  //   });
  // }

  ngOnInit() {
    this.store.dispatch(AuthActions.getAuth());
  }

  // onSubmit() {
  //   const { email, password } = this.form.value;
  //   this.authService
  //     .login(email, password)
  //     .pipe(
  //       tap((u) => {
  //         this.store.dispatch(login({ email, password }));
  //         this.router.navigate(['/']);
  //       })
  //     )
  //     .subscribe(noop, () =>
  //       this.flashMessage.show('Oops, something went wrong', {
  //         cssClass: 'alert-danger',
  //         timeout: 3000,
  //       })
  //     );
  // }

  onSubmit() {
    const { email, password } = this.form.value;
    this.store.dispatch(login({ email, password }));
  }
}
