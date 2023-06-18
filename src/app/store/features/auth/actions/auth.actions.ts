import { createAction, props } from '@ngrx/store';
import { AuthUser } from 'src/app/shared/models/User';

export const getAuthUser = createAction(
  '[AUTH] GET_AUTH_USER'
);

export const getAuthUserSuccess = createAction(
  `[AUTH] GET_AUTH_USER_SUCCESS`,
  props<{ authUser: AuthUser }>()
)

export const login = createAction(
  `[AUTH] Login`,
  props<{ email: string, password: string, rememberMe: boolean }>()
)

export const loginSuccess = createAction(
  `[AUTH] Login_SUCCESS`
)

export const loginError = createAction(
  `[AUTH] Login_ERROR`,
  props<{error: string}>()
)

export const logout = createAction(
  `[AUTH] LOGOUT`,
)

export const logoutSuccess = createAction(
  `[AUTH] LOGOUT_SUCCESS`,
)


