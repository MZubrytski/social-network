import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as UserActions from '../actions/users.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
  ) { }

  setUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.setUsers),
      switchMap(({pageNumber, pageSize}) => {
        console.log('INSIDE SWITH MAP')
        return this.usersService.getUsers(pageNumber, pageSize).pipe(
          map(({items, totalCount}) => UserActions.setUsersSuccess({ users: items, totalUsersCount: totalCount, pageNumber }))
        )
      }),
      catchError((error) => of(error))
    )
  )

  follow$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.follow),
      switchMap(({userId}) => {
        console.log('INSIDE follow')
        return this.usersService.follow(userId).pipe(
          map(({}) => UserActions.followSuccess({ userId }))
        )
      }),
      catchError((error) => of(error))
    )
  )

  unfollow$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.unfollow),
      switchMap(({userId}) => {
        console.log('INSIDE UNfollow')
        return this.usersService.unfollow(userId).pipe(
          map(({}) => UserActions.unfollowSuccess({ userId }))
        )
      }),
      catchError((error) => of(error))
    )
  )
}
