import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
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

  constructor(
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.user$ = this.store.pipe(select(getUser));
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  };
};
