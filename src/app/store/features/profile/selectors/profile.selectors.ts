import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfileState } from "../reducers/profile.reducer";

const selectProfileState = createFeatureSelector<ProfileState>('profileData');

export const getUserProfileData = createSelector(
  selectProfileState,
  profileData => profileData.profile
);

export const getIsUserProfileLoading = createSelector(
  selectProfileState,
  profileData => profileData.isLoading
);

