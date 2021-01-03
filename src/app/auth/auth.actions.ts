import { createAction, props } from '@ngrx/store';
import { Profile } from '../models/Profile';

export const login = createAction(
  '[Login Page] User Login',
  props<{ email: string; password: string }>()
);

export const logout = createAction('[Top Menu] Logout');

export const storeProfile = createAction(
  '[Home] Store Profile',
  props<{ profile: Profile }>()
);

export const loginSuccess = createAction(
  '[Auth API] Login Success',
  props<{ user: { email: string; id: string } }>()
);

export const getAuth = createAction('[Auth API] Get Auth');
