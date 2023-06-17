import { UsersState } from "../features/users/reducers/users.reducer";

export interface AppState {
  users: UsersState;
}

export const initialState = {
  users: {},
};
