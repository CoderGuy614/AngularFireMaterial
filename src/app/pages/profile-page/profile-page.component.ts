import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUser, isLoggedIn } from 'src/app/auth/auth.selectors';
import { User } from 'src/app/auth/model/user.model';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user$: Observable<User>;
  isLoggedIn$: Observable<boolean>;
  
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(getUser));
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
  }

}
