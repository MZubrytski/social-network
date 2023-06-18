import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducers/auth.reducer";

const selectAuthState = createFeatureSelector<AuthState>('authData');

export const getAuthUser = createSelector(
  selectAuthState,
  authData => authData.authUser
);

export const getAuthUserId = createSelector(
  selectAuthState,
  authData => authData.authUser?.id
);

export const getAuthUserLogin = createSelector(
  selectAuthState,
  authData => authData.authUser?.login
);

export const getAuthError = createSelector(
  selectAuthState,
  authData => authData.error
);

export const isAuthUserLoad = createSelector(
  selectAuthState,
  authData => !authData.isLoading
);

