import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '../../reducers';
import { select, Store } from '@ngrx/store';

import { MessageService } from 'src/app/services/MessageService';
import * as actions from '../auth.actions';
import { isLoading, isLoggedIn } from '../auth.selectors';
import { Observable } from 'rxjs';
import * as validators from '../utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading$: Observable<boolean> = this.store.pipe(select(isLoading));

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private flashMessage: MessageService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    }, { validators: [ validators.passwordsMatch() ]});
  };

  ngOnInit() {
    this.store.select(isLoggedIn).subscribe(x => {
      if(x) {
        this.router.navigate(['/'])
      }
    })
  };

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  };

  validateAllFormFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);  
      const control = formGroup.get(field);             
      if (control instanceof FormControl) {             
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.validateAllFormFields(control);           
      }
    });
  };

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  };
  
  isConfirmPasswordValid() {
    return !this.form.valid && this.form.get('confirmPassword').touched;
  };

  onSubmit() {
    if (this.form.valid) {
      const { email, password, confirmPassword } = this.form.value;
      this.store.dispatch(actions.register({ payload: { email, password } }));
    } else {
      this.validateAllFormFields(this.form);
    }
  };
};
