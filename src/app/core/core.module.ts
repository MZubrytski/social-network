import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromAuth from '../store/features/auth/reducers/auth.reducer';
import * as fromProfile from '../store/features/profile/reducers/profile.reducer';
import { AuthEffects } from '../store/features/auth/effects/auth.effects';
import { ProfileEffects } from '../store/features/profile/effects/profile.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({ authData: fromAuth.reducer, profileData: fromProfile.reducer }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects, ProfileEffects]),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true,
  }],
})
export class CoreModule { }
