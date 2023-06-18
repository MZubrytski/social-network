import { Component, OnInit } from '@angular/core';
import { UsersComponentStore } from '../users-store';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss']
})
export class UsersContainerComponent implements OnInit {
  users$ = this.usersComponentStore.users$;
  totalUsersCount$ = this.usersComponentStore.totalUsersCount$
  currentPage$ = this.usersComponentStore.currentPage$;
  pageSize$ = this.usersComponentStore.pageSize$;
  followingInProgress$ = this.usersComponentStore.followInProgress$;
  isLoading$ = this.usersComponentStore.isLoading$;

  constructor(private usersComponentStore: UsersComponentStore) {}

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    const page = await firstValueFrom(this.currentPage$);
    const pageSize = await firstValueFrom(this.pageSize$);
    this.usersComponentStore.fetchUsers({page, pageSize})
  }
}
