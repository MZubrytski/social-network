import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/features/auth/actions/auth.actions';
import { getAuthError } from 'src/app/store/features/auth/selectors/auth.selectors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {
  error$ = this.store.select(getAuthError);
  loginForm!: FormGroup;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]}),
      rememberMe: new FormControl(false),
  }, {updateOn: 'change'});
  }

  signIn() {
    this.store.dispatch(login(this.loginForm.value));
    this.router.navigate(['/profile'])
  }
}
