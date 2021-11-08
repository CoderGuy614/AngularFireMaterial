import { Routes } from "@angular/router";
import { EmailVerifiedComponent } from "../email-verified/email-verified.component";
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";
import { LoginComponent } from "../login/login.component";
import { ProfilePageComponent } from "../../pages/profile-page/profile-page.component";


export const authRoutes: Routes = [
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'profile',
      component: ProfilePageComponent,
    },
    {
      path: 'forgot-password',
      component: ForgotPasswordComponent,
    },
    {
      path: 'email-verified',
      component: EmailVerifiedComponent,
    },
  ];