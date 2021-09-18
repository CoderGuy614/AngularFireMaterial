import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { authReducer } from './reducers/authReducer';
import { AuthService } from './AuthService';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, FieldErrorDisplayComponent, ForgotPasswordComponent, EmailVerifiedComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild([{ path: 'login', component: LoginComponent }, { path: 'register', component: RegisterComponent }]),
    StoreModule.forFeature('auth', authReducer),
  ],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [AuthService],
    };
  }
}
