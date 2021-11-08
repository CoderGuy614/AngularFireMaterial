import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { authReducer } from './reducers/authReducer';
import { AuthService } from './AuthService';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { MaterialModule } from '../material.module';
import { authRoutes } from './shared/authRoutes';

@NgModule({
  declarations: [
    LoginComponent, 
    ForgotPasswordComponent, 
    EmailVerifiedComponent, 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild(authRoutes),
    StoreModule.forFeature('auth', authReducer),
    MaterialModule
  ],
  exports: [LoginComponent],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [AuthService],
    };
  }
}
