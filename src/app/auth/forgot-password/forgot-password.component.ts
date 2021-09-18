import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { MessageService } from 'src/app/services/MessageService';
import { isLoading, isLoggedIn } from '../auth.selectors';
import * as actions from '../auth.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  loading$: Observable<boolean> = this.store.pipe(select(isLoading));

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private flashMessage: MessageService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
   }

  ngOnInit(): void {
    this.store.select(isLoggedIn).subscribe(x => {
      if(x) {
        this.router.navigate(['/'])
      }
    })
  };

  onSendPasswordResetEmail() {
    const { email } = this.form.value; 
    this.store.dispatch(actions.sendPasswordResetEmail({ payload: { email }}));
  };

  onSubmit() {
    const { email } = this.form.value;
    this.store.dispatch(actions.sendPasswordResetEmail({ payload: { email } }));
  };

};
