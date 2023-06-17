import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setUsers } from '../store/features/users/actions/users.actions';
import { firstValueFrom } from 'rxjs';
import { getCurrentPage, getPageSize } from '../store/features/users/selectors/user.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    const pageSize = await firstValueFrom(this.store.select(getPageSize))
    const pageNumber = await firstValueFrom(this.store.select(getCurrentPage))
    console.log('pageSize', pageSize, 'pageNumber', pageNumber)
    this.store.dispatch(setUsers({pageNumber, pageSize}))
  }
}
