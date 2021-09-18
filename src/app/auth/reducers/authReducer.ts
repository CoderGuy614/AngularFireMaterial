import { createReducer, on } from '@ngrx/store';
import { User } from '../model/user.model';
import { Profile } from '../../models/Profile';
import * as actions from '../auth.actions';

export interface AuthState {
  user: User;
  profile: Profile;
  loading: boolean;
  error: any;
}

export const initialAuthState: AuthState = {
  user: null,
  profile: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(

  initialAuthState,
  on(actions.getUser, (state, action) => {
    return {
      ...state, 
      loading: true
    }
  }),

  on(actions.login, (state, action) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(actions.authenticated, (state, action) => {
    return {
      ...state,
      user: action.payload,
      loading: false
    };
  }),

  on(actions.notAuthenticated, (state, action) => {
    return {
      ...state, 
      user: null, 
      loading: false
    }
  }),

  on(actions.authError, (state, action) => {
    return {
      ...state, 
      user: null, 
      loading: false, 
      error: action.payload
    }
  }),

  on(actions.logout, (state, action) => {
    return {
      ...state,
      user: undefined,
      profile: undefined,
    };
  }),

  on(actions.loadProfile, (state, action) => {
    return { ...state, profile: action.profile };
  }),

);
