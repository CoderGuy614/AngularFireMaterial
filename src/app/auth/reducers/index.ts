import { createReducer, on } from '@ngrx/store';
import { User } from '../model/user.model';
import { Profile } from '../../models/Profile';
import { AuthActions } from '../action-types';

export interface AuthState {
  user: User;
  profile: Profile;
  auth: any;
}

export const initialAuthState: AuthState = {
  user: undefined,
  profile: undefined,
  auth: undefined,
};

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),

  on(AuthActions.logout, (state, action) => {
    return {
      ...state,
      user: undefined,
      profile: undefined,
    };
  }),

  on(AuthActions.storeProfile, (state, action) => {
    return { ...state, profile: action.profile };
  }),

  on(AuthActions.getAuth, (state, action) => {
    return { ...state, auth: 'Auth Ran' };
  })
);
