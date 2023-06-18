import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "../reducers/users.reducer";

const selectUsersState = createFeatureSelector<UsersState>('users');

export const getCurrentUsers = createSelector(
  selectUsersState,
  usersData => usersData.users
);

export const getTotalUsersCount = createSelector(
  selectUsersState,
  usersData => usersData.totalUsersCount
);

export const getCurrentPage = createSelector(
  selectUsersState,
  usersData => usersData.currentPage
);

export const getPageSize = createSelector(
  selectUsersState,
  usersData => usersData.pageSize
);
