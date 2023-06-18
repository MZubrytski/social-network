import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/features/auth/actions/auth.actions';
import { getAuthUserLogin } from 'src/app/store/features/auth/selectors/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isLoginPage!:boolean;
  userLogin$ = this.store.select(getAuthUserLogin)

  constructor(private store: Store) {}

  logout(): void {
    this.store.dispatch(logout())
  }
}
