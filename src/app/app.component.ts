import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppState } from './reducers';
import * as authActions from './auth/auth.actions';
import { isAuthLoading, isLoggedIn, getUser } from './auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAuthLoading$: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(isLoggedIn).subscribe((isAuth) => {
      if (!isAuth) {
        this.isAuthLoading$ = this.store.select(isAuthLoading);
        this.store.dispatch(authActions.getUser());
      }
    });
  }
}
