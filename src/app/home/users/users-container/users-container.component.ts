import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UsersComponentStore } from '../users-store';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { getAuthUserId } from 'src/app/store/features/auth/selectors/auth.selectors';

@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersContainerComponent implements OnInit, OnDestroy {
  users$ = this.usersComponentStore.users$;
  totalUsersCount$ = this.usersComponentStore.totalUsersCount$
  currentPage$ = this.usersComponentStore.currentPage$;
  pageSize$ = this.usersComponentStore.pageSize$;
  followingInProgress$ = this.usersComponentStore.followInProgress$;
  authUserId$ = this.store.select(getAuthUserId);
  isLoading$ = this.usersComponentStore.isLoading$;


  constructor(private usersComponentStore: UsersComponentStore, private store: Store) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
      this.usersComponentStore.resetStore()
  }

  async getUsers() {
    const page = await firstValueFrom(this.currentPage$);
    const pageSize = await firstValueFrom(this.pageSize$);
    this.usersComponentStore.fetchUsers({page, pageSize})
  }
}
