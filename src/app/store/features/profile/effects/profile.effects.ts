import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProfileActions from '../actions/profile.actions';

import { map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { ProfileService } from './../../../../core/services/profile.service';
import { Store, select } from '@ngrx/store';
import { getAuthUserId } from '../../auth/selectors/auth.selectors';
import { getUserProfileData } from '../selectors/profile.selectors';
import { Profile } from 'src/app/shared/models/Profile';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private store: Store
  ) {}

  getProfileUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(ProfileActions.getUserProfile),
      switchMap(({userId}) => {
        console.log('userId', userId)
        return this.profileService.getProfile(userId).pipe(
          tap((profile) => {console.log('auth from action', profile)}),
          map(profile => ProfileActions.getUserProfileSuccess({ profile })),
        )
      }
      ),
    )
  )

  updateUserProfile$ = createEffect(
    () => this.actions$.pipe(
      ofType(ProfileActions.updateUserProfile),
      switchMap(({profile}) => {
        return this.profileService.saveProfile(profile).pipe(
          map(_ => ProfileActions.updateUserProfileSuccess()),
        )
      }
      ),
    )
  )

  updateUserProfileData$ = createEffect(
    () => this.actions$.pipe(
    ofType(ProfileActions.updateUserProfileSuccess),
    withLatestFrom(this.store.pipe(select(getAuthUserId))),
    switchMap(([_, userId]) => {
      return of(ProfileActions.getUserProfile({userId} as {userId: number}))
    })
    ))

    updateUserPhoto$ = createEffect(
      () => this.actions$.pipe(
      ofType(ProfileActions.updateUserPhoto),
      withLatestFrom(this.store.pipe(select(getUserProfileData))),
      switchMap(([{photo}, profile]) => {
        return this.profileService.savePhoto(photo).pipe(
          map(data => ProfileActions.updateUserPhotoSuccess({ photos: data.data.photos, profile } as {photos: {large: string; small: string}, profile: Profile})),
        )
      }
      ),
      ))
}
