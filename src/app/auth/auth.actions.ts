import { createAction, props } from '@ngrx/store';
import { Profile } from '../models/Profile';
import { User } from './model/user.model';


export const getUser = createAction(
  '[Auth API] Get User'
);

export const register = createAction(
  '[Register Page] User Register',
  props<{ payload: any }>()
);

export const login = createAction(
  '[Login Page] User Login',
  props<{ payload: any }>()
);

export const sendPasswordResetEmail = createAction(
  '[Login Page] Send Password Reset Email',
  props<{ payload: any }>()
);

export const sendPasswordResetEmailSuccess = createAction(
  '[Login Page] Send Password Reset Email Success'
);

export const sendPasswordResetEmailFail = createAction(
  '[Login Page] Send Password Reset Email Fail'
);

export const authenticated = createAction(
  '[Auth API] Authenticated',
  props<{ payload: User }>()
);

export const notAuthenticated = createAction(
  '[Auth API] Not Authenticated'
);

export const authError = createAction(
  '[Auth API] Auth Error',
  props<{ payload: any }>()
);

export const logout = createAction('[Top Menu] Logout');

export const loadProfile = createAction(
  '[Home] Store Profile',
  props<{ profile: Profile }>()
);
