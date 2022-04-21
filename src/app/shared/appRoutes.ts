import { Routes } from "@angular/router";
import { EmailVerifiedComponent } from "../auth/email-verified/email-verified.component";
import { ForgotPasswordComponent } from "../auth/forgot-password/forgot-password.component";
import { LoginComponent } from "../auth/login/login.component";
import { HomeComponent } from "../pages/home/home.component";
import { ProductDetailPageComponent } from "../pages/product-detail-page/product-detail-page.component";
import { ProfilePageComponent } from "../pages/profile-page/profile-page.component";


export const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
    },
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
    {
      path: 'product-detail',
      component: ProductDetailPageComponent,
    },
  ];