import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/User';

export const setUsers = createAction(
  '[USERS] SET_USERS',
  props<{ pageNumber: number, pageSize: number }>()
);

export const setUsersSuccess = createAction(
  '[USERS] SET_USERS_SUCCESS',
  props<{ users: User[], totalUsersCount: number, pageNumber: number }>()
);

export const follow = createAction(
  '[USERS] FOLLOW',
  props<{ userId: number }>()
);

export const unfollow = createAction(
  '[USERS] UNFOLLOW',
  props<{ userId: number }>()
);

export const followSuccess = createAction(
  '[USERS] FOLLOW_SUCCESS',
  props<{ userId: number }>()
);

export const unfollowSuccess = createAction(
  '[USERS] UNFOLLOW_SUCCESS',
  props<{ userId: number }>()
);

export const setCurrentPage = createAction(
  '[USERS] SET_CURRENT_PAGE',
  props<{ currentPage: number }>()
);
/*
export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
  return items.map(u => {
      if (u[objPropName] === itemId) {
          return {...u, ...newObjProps}
      }
      return u;
  })
}
*/
