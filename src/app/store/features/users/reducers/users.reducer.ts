import { createReducer, on } from '@ngrx/store';

import * as UserActions from './../actions/users.actions';
import { User } from 'src/app/shared/models/User';

export interface UsersState {
  users: User[];
  isLoading: boolean;
  followInProgress: boolean;
  totalUsersCount: number;
  currentPage: number;
  pageSize: number;
}

export const initialState: UsersState = {
  users: [],
  isLoading: false,
  followInProgress: false,
  totalUsersCount: 0,
  currentPage: 1,
  pageSize: 5
}

export const reducer = createReducer(
  initialState,
  on(UserActions.setUsers, (state) => ({
    ...state,
    isLoading: true
  })),
  on(UserActions.setUsersSuccess, (state, { users, totalUsersCount, pageNumber }) => ({
    ...state,
    users,
    totalUsersCount,
    currentPage: pageNumber,
    isLoading: false,
  })),
  on(UserActions.follow, (state) => ({
    ...state,
    followingInProgress: true,
  })),
  on(UserActions.followSuccess, (state, { userId}) => ({
    ...state,
    users: state.users.map(user => {
      if (user.id === userId) {
          return {...user, followed: true}
      }
      return user;
  }),
    followingInProgress: false,
  })),
  on(UserActions.unfollow, (state) => ({
    ...state,
    followingInProgress: true,
  })),
  on(UserActions.unfollow, (state, { userId}) => ({
    ...state,
    users: state.users.map(user => {
      if (user.id === userId) {
          return {...user, followed: false}
      }
      return user;
  }),
    followingInProgress: false,
  })),
)
