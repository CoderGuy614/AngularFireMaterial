import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '../../reducers';
import { select, Store } from '@ngrx/store';

import { MessageService } from '../../services/MessageService';
import * as actions from '../auth.actions';
import { isLoading, isLoggedIn } from '../auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
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
      password: ['', [Validators.required]],
    });
  };

  ngOnInit() {
    this.store.select(isLoggedIn).subscribe((loggedIn) => {
      if((loggedIn)) {
        this.router.navigate(['/'])
      }
    })
  };

  onSubmit() {
    const { email, password } = this.form.value;
    this.store.dispatch(actions.login({ payload: { email, password } }));
  };
}
