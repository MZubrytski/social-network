import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';

import { catchError, map, of, switchMap} from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}

  getAuthUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.getAuthUser),
      switchMap(() => {
        return this.authService.getAuthUser().pipe(
          map(authUser => AuthActions.getAuthUserSuccess({ authUser })),
        )
      }
      ),
    )
  )

  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({email, password, rememberMe}) => {
        return this.authService.login(email, password, rememberMe).pipe(
          map(_ => AuthActions.loginSuccess()),
          catchError(error =>{
            return of(AuthActions.loginError({error: error.message}))
          } ))
      }
      ),
    )
  )

  loginSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      switchMap((_) => {
        return of(AuthActions.getAuthUser())
      }
      )
    )
  )

  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => {
        return this.authService.logout().pipe(
          map(_ => AuthActions.logoutSuccess()))
      }
      ),
    )
  )
}
