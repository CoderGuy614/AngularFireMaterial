import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { User } from '../model/user.model';
import { Profile } from '../../models/Profile';
import { AuthActions } from '../action-types';

export interface AuthState {
  user: User;
  profile: Profile;
}

export const initialAuthState: AuthState = {
  user: undefined,
  profile: undefined,
};

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state, action) => {
    return {
      user: { email: action.email, id: action.id },
    };
  }),

  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined,
      profile: undefined,
    };
  }),

  on(AuthActions.storeProfile, (state, action) => {
    return { ...state, profile: action.profile };
  })
);
