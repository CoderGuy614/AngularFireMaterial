import { login } from '../auth.actions';
import { AuthService } from '../AuthService';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { noop } from 'rxjs';

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

  // onSubmit() {
  //   const val = this.form.value;
  //   this.authService
  //     .login(val.email, val.password)
  //     .then((res) => {
  //       this.flashMessage.show('You are now logged in', {
  //         cssClass: 'alert-success',
  //         timeout: 3000,
  //       });

  //       this.router.navigate(['/']);
  //     })
  //     .catch((err) => {
  //       this.flashMessage.show(err.message, {
  //         cssClass: 'alert-danger',
  //         timeout: 4000,
  //       });
  //     });
  // }

  onSubmit() {
    const val = this.form.value;
    this.authService
      .login(val.email, val.password)
      //If u comes back with a user, then I am successfully logged in to the firebase API
      // Dispatch the user login function in auth actions to put the user in the store
      // Navigate to the homepage
      .pipe(
        tap((u) => {
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
