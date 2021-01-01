import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] User Login',
  props<{ email: string; id: string }>()
);

export const logout = createAction('[Top Menu] Logout');
