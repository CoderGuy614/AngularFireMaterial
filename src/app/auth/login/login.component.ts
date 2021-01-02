import { login } from '../auth.actions';
import { AuthService } from '../AuthService';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';

import { FlashMessagesService } from 'angular2-flash-messages';

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

  ngOnInit() {
    this.authService.getAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    const val = this.form.value;
    this.authService
      .login(val.email, val.password)
      .pipe(
        tap((u) => {
          this.store.dispatch(login({ email: u.user.email, id: u.user.uid }));
          this.router.navigate(['/']);
        })
      )
      .subscribe(noop, () =>
        this.flashMessage.show('Oops, something went wrong', {
          cssClass: 'alert-danger',
          timeout: 3000,
        })
      );
  }
}
