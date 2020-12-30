import { login } from './../../reducers/actions';
import { AuthService } from './../../services/authService';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private store: Store,
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
      .then((res) => {
        this.flashMessage.show('You are now logged in', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.flashMessage.show(err.message, {
          cssClass: 'alert-danger',
          timeout: 4000,
        });
      });
  }
}
