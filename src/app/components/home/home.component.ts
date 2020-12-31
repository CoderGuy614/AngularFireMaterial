import { AuthService } from '../../auth/AuthService';
import { ProfileService } from './../../services/profile.service';
import { UserService } from './../../services/user.service';

import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { Profile } from '../../models/Profile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users: User[];
  profile: Profile = null;
  auth: any = null;
  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
    // this.profile = this.profileService.getProfile();
    this.auth = this.authService.getAuth().subscribe((auth) => {
      // console.log(auth);
      if (auth) {
        this.profileService
          .getProfileId(auth.email)
          .subscribe((id) =>
            this.profileService
              .getProfile(id)
              .subscribe((x) => (this.profile = x))
          );
      }
    });
  }
}
