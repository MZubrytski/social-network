import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/store/model/state.model";
import { UsersState } from "../reducers/users.reducer";

export const getUsersState = ((state: AppState) => state.users);

const selectCategoriesState = createFeatureSelector<UsersState>('users');

export const getCurrentUsers = createSelector(
  selectCategoriesState,
  usersData => usersData.users
);

export const getTotalUsersCount = createSelector(
  selectCategoriesState,
  usersData => usersData.totalUsersCount
);

export const getCurrentPage = createSelector(
  selectCategoriesState,
  usersData => usersData.currentPage
);

export const getPageSize = createSelector(
  selectCategoriesState,
  usersData => usersData.pageSize
);
