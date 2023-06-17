import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { User } from 'src/app/shared/models/User';
import { follow, setUsers, unfollow } from 'src/app/store/features/users/actions/users.actions';
import { getCurrentPage, getCurrentUsers, getPageSize, getTotalUsersCount } from 'src/app/store/features/users/selectors/user.selector';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    constructor(private store: Store) {}
    users: User[] = [];
    pageSize = 5;
    totalUsersCount$: Observable<number> = of(1);
    currentPage$: Observable<number> = of(1);
    pageSize$: Observable<number> = of(1);

    unfollow(userId: number) {
      this.store.dispatch(unfollow({userId}))
    }

    follow(userId: number) {
      this.store.dispatch(follow({userId}))
    }

    onPageChanged(paginatorData: {pageNumber: number, pageSize: number}) {
      const {pageNumber, pageSize}  = paginatorData
      this.store.dispatch(setUsers({pageNumber, pageSize}))
  }

    ngOnInit(): void {
      this.store.pipe(select(getCurrentUsers)).subscribe((data) => {
        if(data) {
          this.users = data;
        }
      })

      this.totalUsersCount$ = this.store.select(getTotalUsersCount);
      this.currentPage$ = this.store.select(getCurrentPage);
      this.pageSize$ = this.store.select(getPageSize);
    }
}
