import { AuthState } from "../features/auth/reducers/auth.reducer";
import { UsersState } from "../features/users/reducers/users.reducer";

export interface AppState {
  users: UsersState;
  authData: AuthState;
}

export const initialState = {
  users: {},
  authData: {}
};
