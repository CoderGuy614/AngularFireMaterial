import { storeProfile } from './../../auth/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { AuthService } from '../../auth/AuthService';

import { ProfileService } from './../../services/profile.service';
import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/Profile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  profile: Profile = null;
  auth: any = null;
  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.auth = this.authService.getAuth().subscribe((auth) => {
      if (auth) {
        this.profileService.getProfileId(auth.email).subscribe((id) =>
          this.profileService.getProfile(id).subscribe((x) => {
            this.store.dispatch(storeProfile({ profile: x }));
            this.profile = x;
          })
        );
      }
    });
  }
}
