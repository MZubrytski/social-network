import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getAuthUserId } from 'src/app/store/features/auth/selectors/auth.selectors';
import { firstValueFrom } from 'rxjs';
import { getUserProfile } from 'src/app/store/features/profile/actions/profile.actions';
import { getIsUserProfileLoading, getUserProfileData } from 'src/app/store/features/profile/selectors/profile.selectors';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileContainerComponent implements OnInit {
  profile$ = this.store.select(getUserProfileData);
  authUserId$ = this.store.select(getAuthUserId);
  isUserProfileLoading$ = this.store.select(getIsUserProfileLoading);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
  }

  ngOnInit(): void {
      this.setProfile()

  }

  async setProfile(): Promise<void> {
    let userId = this.route.snapshot.params['id'];
    if (!userId) {
        userId = await firstValueFrom(this.authUserId$);
        if (!userId) {
            this.router.navigate(['login']);
            return
        }
    }

    this.store.dispatch(getUserProfile({userId}))
}
}
