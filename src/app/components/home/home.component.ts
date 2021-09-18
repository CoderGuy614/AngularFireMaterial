import { loadProfile } from './../../auth/auth.actions';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { AuthService } from '../../auth/AuthService';

import { ProfileService } from '../../services/ProfileService';
import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/Profile';
import * as actions from '../../auth/auth.actions';
import { combineLatest, Observable } from 'rxjs';
import { isLoggedIn } from 'src/app/auth/auth.selectors';
import { first, ignoreElements, map, switchMap, tap } from 'rxjs/operators';
import { getUser } from '../../auth/auth.selectors';
import { User } from 'src/app/auth/model/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  profile: Profile = null;
  user$: Observable<User>;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.user$ = this.store.pipe(select(getUser));
    // this.store.select(isLoggedIn).subscribe(
    //   userIsLoggedIn => {
    //     if(userIsLoggedIn){
    //       // this.fetchProfile(authUser.email)
    //     }
    //   }
    // )
  };


  // fetchProfile(email: string) {
  //   return this.profileService.getProfileId(email).subscribe(profileId => {
  //     this.profileService.getProfile(profileId).subscribe(profile => {
  //       this.store.dispatch(loadProfile({ profile }));
  //       this.profile = profile;
  //     })
  //   });
  // };

}
