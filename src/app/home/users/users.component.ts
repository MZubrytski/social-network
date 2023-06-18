import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { UsersComponentStore } from './users-store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
    @Input() users!: User[];
    @Input() totalUsersCount!: number;
    @Input() currentPage!: number;
    @Input() pageSize!: number;
    @Input() followingInProgress!: boolean;
    @Input() isLoading!: boolean;

    constructor(private usersComponentStore: UsersComponentStore) {}

    unfollow(userId: number) {
      this.usersComponentStore.unfollow(userId);
    }

    follow(userId: number) {
      this.usersComponentStore.follow(userId);
    }

    onPageChanged(paginatorData: {pageNumber: number, pageSize: number}): void {
      const {pageNumber, pageSize}  = paginatorData
      this.usersComponentStore.fetchUsers({page: pageNumber, pageSize})
  }
}
