import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './../actions/auth.actions';
import { AuthUser } from 'src/app/shared/models/User';

export interface AuthState {
  authUser: AuthUser | null,
  isLoading: boolean,
  error: string | null
}

export const initialState: AuthState = {
  authUser: null,
  isLoading: true,
  error: null
}

export const reducer = createReducer(
  initialState,
  on(AuthActions.getAuthUser, (state) => ({
    ...state,
    isLoading: true
  })),
  on(AuthActions.getAuthUserSuccess, (state, { authUser }) => ({
    ...state,
    authUser,
    isLoading: false,
  })),
  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AuthActions.loginSuccess, (state) => ({
    ...state,
    error: null,
    isLoading: false,
  })),
  on(AuthActions.loginError, (state, {error}) => {
    console.log('error', error)
    return  {
    ...state,
    error,
    isLoading: false
  }}),
  on(AuthActions.logout, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    authUser: null,
    isLoading: false,
  })),
)
