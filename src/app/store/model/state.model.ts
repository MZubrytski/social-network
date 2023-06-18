import { AuthState } from "../features/auth/reducers/auth.reducer";
import { ProfileState } from "../features/profile/reducers/profile.reducer";

export interface AppState {
  authData: AuthState;
  profile: ProfileState;
}

export const initialState = {
  authData: {},
  profileData: {}
};
