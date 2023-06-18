import { createReducer, on } from '@ngrx/store';

import * as ProfileActions from '../actions/profile.actions';
import { Profile } from 'src/app/shared/models/Profile';

export interface ProfileState {
  profile: Profile | null,
  isLoading: boolean
}

export const initialState: ProfileState = {
  profile: null,
  isLoading: true,
}

export const reducer = createReducer(
  initialState,
  on(ProfileActions.getUserProfile, (state) => ({
    ...state,
    isLoading: true
  })),
  on(ProfileActions.getUserProfileSuccess, (state, { profile }) => ({
    ...state,
    profile,
    isLoading: false,
  })),
  on(ProfileActions.updateUserProfile, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProfileActions.updateUserProfileSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(ProfileActions.updateUserPhoto, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProfileActions.updateUserPhotoSuccess, (state, {profile, photos}) => ({
    ...state,
    profile: {...profile, photos},
    isLoading: false,
  })),
)
