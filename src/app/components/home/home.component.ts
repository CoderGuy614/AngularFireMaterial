import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers/index';

import { Component, OnInit } from '@angular/core';

import * as actions from '../../auth/auth.actions';
import { combineLatest, Observable } from 'rxjs';
import { isLoading, isLoggedIn } from 'src/app/auth/auth.selectors';
import { getUser } from '../../auth/auth.selectors';
import { User } from 'src/app/auth/model/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  user$: Observable<User>;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.user$ = this.store.pipe(select(getUser));
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
  }
};
