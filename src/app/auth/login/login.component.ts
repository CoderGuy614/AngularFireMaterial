import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import * as validators from '../utils/validators';

import * as actions from '../auth.actions';
import { isLoading, isLoggedIn } from '../auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loading$: Observable<boolean> = this.store.pipe(select(isLoading));

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.registerForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    }, { validators: [ validators.passwordsMatch() ]});
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
      this.validateAllFormFields(this.registerForm);
    }
  };

  displayFieldCssLogin(field: string) {
    return {
      'has-error': this.isFieldValidLogin(field),
      'has-feedback': this.isFieldValidLogin(field)
    };
  };

  displayFieldCssRegister(field: string) {
    return {
      'has-error': this.isFieldValidRegister(field),
      'has-feedback': this.isFieldValidRegister(field)
    };
  };

  validateAllFormFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);             
      if (control instanceof FormControl) {             
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.validateAllFormFields(control);           
      }
    });
  };

  isFieldValidLogin(field: string) {
    return !this.loginForm.get(field).valid && this.loginForm.get(field).touched;
  };

  isFieldValidRegister(field: string) {
    return !this.registerForm.get(field).valid && this.registerForm.get(field).touched;
  };
  
  isConfirmPasswordValid() {
    return !this.registerForm.valid && this.registerForm.get('confirmPassword').touched;
  };

}
