import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import * as validators from '../utils/validators';

import * as actions from '../auth.actions';
import { isLoading, isLoggedIn } from '../auth.selectors';
import { Observable } from 'rxjs';
import { validateAllFormFields, isFieldValid } from '../utils/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loading$: Observable<boolean> = this.store.pipe(select(isLoading));
  isFieldValid: Function = isFieldValid;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['']
      }, 
      { validators: [ validators.passwordsMatch() ]});
  };

  ngOnInit() {
    this.store.select(isLoggedIn).subscribe((loggedIn) => {
      if((loggedIn)) {
        this.router.navigate(['/'])
      }
    })
  };

  onSubmitLogin() {
    const { email, password } = this.loginForm.value;
    this.store.dispatch(actions.login({ payload: { email, password } }));
  };

  onSubmitRegister() {
    if (this.registerForm.valid) {
      const { email, password, confirmPassword } = this.registerForm.value;
      this.store.dispatch(actions.register({ payload: { email, password } }));
    } else {
      validateAllFormFields(this.registerForm);
    }
  };

  isConfirmPasswordInvalid(form: FormGroup) {
    const isInvalid = form.hasError('passwordsDontMatch');
    form.get('confirmPassword').setErrors(isInvalid ? { valid: false } : null);
    return isInvalid;
  };

}
