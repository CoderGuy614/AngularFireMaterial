import { AuthService } from './../../services/authService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  onLogoutClick() {
    this.authService.logout();
    // this.flashMessage.show('You are now Logged Out', {
    //   cssClass: 'alert-success',
    //   timeout: 4000,
    // });
    this.router.navigate(['/login']);
  }

  ngOnInit() {}
}
