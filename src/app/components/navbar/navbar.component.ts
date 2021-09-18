import { Observable } from 'rxjs';

import { AuthService } from '../../auth/AuthService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../services/MessageService';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import * as actions from '../../auth/auth.actions';
import { isLoggedIn, isLoggedOut } from '../../auth/auth.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private flashMessage: MessageService,
    private router: Router
  ) {}

  onLogoutClick() {
    this.authService.logout();
    this.store.dispatch(actions.logout());
    this.flashMessage.showMessage('You are now logged out', 'alert-warning', 3000);
    this.router.navigate(['/login']);
  };

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  };
};
