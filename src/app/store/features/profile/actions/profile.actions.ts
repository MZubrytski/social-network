import { createAction, props } from '@ngrx/store';
import { Profile } from 'src/app/shared/models/Profile';

export const getUserProfile = createAction(
  '[AUTH] GET_USER_PROFILE',
  props<{ userId: number }>()
);

export const getUserProfileSuccess = createAction(
  `[AUTH] GET_USER_PROFILE_SUCCESS`,
  props<{ profile: Profile }>()
)

export const updateUserProfile = createAction(
  `[AUTH] UPDATE_USER_PROFILE`,
  props<{ profile: Profile }>()
)


export const updateUserProfileSuccess = createAction(
  `[AUTH] UPDATE_USER_PROFILE_SUCCESS`
  )

export const updateUserPhoto = createAction(
  `[AUTH] UPDATE_USER_PROFILE_PHOTO`,
  props<{ photo: File }>()
)

export const updateUserPhotoSuccess = createAction(
  `[AUTH] UPDATE_USER_PROFILE_PHOTO_SUCCESS`,
  props<{   photos: {
    small: string | null;
    large: string | null;
  }, profile: Profile }>()
)

