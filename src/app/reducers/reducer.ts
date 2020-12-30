import { UserService } from './../services/user.service';
import { ActionsSubject, createReducer, on } from '@ngrx/store';
import { Actions } from './action-types';

export const initialState = {
  user: undefined,
};

const _userReducer = createReducer(
  initialState,
  on(Actions.login, (state, action) => {
    return {
      user: action.user,
    };
  }),
  on(Actions.logout, (state, action) => {
    return {
      user: undefined,
    };
  })
);

export function userReducer(state, action) {
  return _userReducer(state, action);
}
