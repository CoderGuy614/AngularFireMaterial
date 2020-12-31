import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { authReducer } from './reducers';
import { AuthService } from './AuthService';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: 'login', component: LoginComponent }]),
    StoreModule.forFeature('auth', authReducer),
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
