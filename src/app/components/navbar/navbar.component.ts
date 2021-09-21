import { Observable } from 'rxjs';

import { AuthService } from '../../auth/AuthService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../services/MessageService';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import * as actions from '../../auth/auth.actions';
import { getUser, isLoggedIn, isLoggedOut } from '../../auth/auth.selectors';
import { User } from 'src/app/auth/model/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  user$: Observable<User>;
  userPhotoPlaceholder: string = 'https://www.gravatar.com/avatar/02f1c10ef8930a258e3d6b6e8640d155?s=200&r=pg&d=mm'
  isNavOpen: boolean = false;

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
    this.user$ = this.store.pipe(select(getUser));
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  };

  toggleCollapse() {
    const navbar = document.getElementById('navbar');
      if(navbar.classList.contains('show')) {
        navbar.classList.remove('show');
        navbar.classList.add('collapse');
      } else if(navbar.classList.contains('collapse')) {
        navbar.classList.add('show')
      }
  };
};
