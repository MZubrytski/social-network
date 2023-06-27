import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { UsersComponentStore } from './users-store';
import { trackById } from 'src/app/shared/utils';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  @Input() users!: User[];
  @Input() totalUsersCount!: number;
  @Input() currentPage!: number;
  @Input() pageSize!: number;
  @Input() followingInProgress!: boolean;
  @Input() isLoading!: boolean;
  @Input() authUserId!: number;

  trackById = trackById

  constructor(private usersComponentStore: UsersComponentStore) { }

  unfollow(userId: number) {
    this.usersComponentStore.unfollow(userId);
  }

  follow(userId: number) {
    this.usersComponentStore.follow(userId);
  }

  onPageChanged(paginatorData: { pageNumber: number, pageSize: number }): void {
    const { pageNumber, pageSize } = paginatorData
    this.usersComponentStore.fetchUsers({ page: pageNumber, pageSize })
  }
}
