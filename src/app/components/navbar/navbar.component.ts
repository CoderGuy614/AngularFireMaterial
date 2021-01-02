import { Observable } from 'rxjs';

import { AuthService } from '../../auth/AuthService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { logout } from '../../auth/auth.actions';
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
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  onLogoutClick() {
    this.authService.logout();
    this.store.dispatch(logout());
    this.flashMessage.show('You are now Logged Out', {
      cssClass: 'alert-warning',
      timeout: 4000,
    });
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  }
}
