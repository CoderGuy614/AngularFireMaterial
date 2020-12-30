import { LoginComponent } from './../components/login/login.component';
import { createAction, props } from '@ngrx/store';

import { LoginCredentials } from '../models/User';

export const login = createAction(
  '[Login Page] User Login',
  props<{ user: LoginCredentials }>()
);

export const logout = createAction('[Navigation] Logout');
