import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAuthUser } from './store/features/auth/actions/auth.actions';
import { isAuthUserLoad } from './store/features/auth/selectors/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  isAuthFetch$: Observable<boolean> = this.store.select(isAuthUserLoad);
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getAuthUser());
  }
}
