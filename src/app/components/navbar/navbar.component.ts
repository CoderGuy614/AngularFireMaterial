import { AuthService } from '../../auth/AuthService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { logout } from '../../auth/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
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

  ngOnInit() {}
}
