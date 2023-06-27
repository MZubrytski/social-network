import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/shared/models/User';

export interface UsersState {
  users: User[];
  isLoading: boolean;
  followInProgress: boolean;
  totalUsersCount: number;
  currentPage: number;
  pageSize: number;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  followInProgress: false,
  totalUsersCount: 0,
  currentPage: 1,
  pageSize: 5
};

@Injectable()
export class UsersComponentStore extends ComponentStore<UsersState> {
  constructor(private usersService: UsersService) {
    super(initialState);
  }

  readonly totalUsersCount$: Observable<number> = this.select(state => state.totalUsersCount);
  readonly pageSize$: Observable<number> = this.select(state => state.pageSize);
  readonly currentPage$: Observable<number> = this.select(state => state.currentPage);
  readonly followInProgress$: Observable<boolean> = this.select(state => state.followInProgress);
  readonly isLoading$: Observable<boolean> = this.select(state => state.isLoading);
  readonly users$: Observable<User[]> = this.select(state => state.users);

  readonly resetStore = this.updater(() => {
    return {
      ...initialState,
    };
  });

  readonly setUsers = this.updater((state, users: User[]) => {
    return {
      ...state,
      users,
    };
  });

  readonly setFollowedUser = this.updater((state, userId: number) => {
    return {
      ...state,
      users: state.users.map(user => {
        if (user.id === userId) {
          return { ...user, followed: true }
        }
        return user;
      }),
    };
  });

  readonly setUnfollowedUser = this.updater((state, userId: number) => {
    return {
      ...state,
      users: state.users.map(user => {
        if (user.id === userId) {
          return { ...user, followed: false }
        }
        return user;
      })
    };
  });

  readonly setCurrentPage = this.updater((state, currentPage: number) => {
    return {
      ...state,
      currentPage,
    };
  });

  readonly setTotalUsersCount = this.updater((state, totalUsersCount: number) => {
    return {
      ...state,
      totalUsersCount,
    };
  });

  readonly setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  readonly setFollowingInProgress = this.updater((state, followInProgress: boolean) => ({
    ...state,
    followInProgress,
  }));

  readonly fetchUsers = this.effect((page$: Observable<{ page: number, pageSize: number }>) =>
    page$.pipe(
      tap(() => {
        this.setIsLoading(true);
      }),
      switchMap(({ page, pageSize }) =>
        this.usersService.getUsers(page, pageSize).pipe(
          tapResponse(
            ({ items, totalCount }) => {
              this.setUsers(items);
              this.setTotalUsersCount(totalCount);
              this.setCurrentPage(page);
              this.setIsLoading(false);
            },
            error => console.log('UserStore::fetchUsers - error', error),
          ),
        )
      )
    )
  );

  follow = this.effect((userId$: Observable<number>) =>
    userId$.pipe(
      tap(() => {
        this.setFollowingInProgress(true);
      }),
      switchMap((userId) =>
        this.usersService.follow(userId).pipe(
          tapResponse(
            () => {
              this.setFollowedUser(userId);
              this.setFollowingInProgress(false);
            },
            error => console.log('UserStore::follow - error', error)
          )
        )
      )
    )
  );

  unfollow = this.effect((userId$: Observable<number>) =>
    userId$.pipe(
      tap(() => {
        this.setFollowingInProgress(true);
      }),
      switchMap((userId) =>
        this.usersService.unfollow(userId).pipe(
          tapResponse(
            () => {
              this.setUnfollowedUser(userId);
              this.setFollowingInProgress(false);
            },
            error => console.log('UserStore::unfollow - error', error)
          )
        )
      )
    )
  );
}
