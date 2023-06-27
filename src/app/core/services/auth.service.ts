import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthUser } from 'src/app/shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getAuthUser(): Observable<AuthUser> {
    return this.http.get<{data: AuthUser}>(`auth/me`).pipe((map((data) => {
      const authUser = data.data;
      return authUser
    })))
  }

  login(email: string, password: string, rememberMe: boolean): Observable<any> {
    return this.http.post(`auth/login`, { email, password, rememberMe }).pipe(
      map((response: any) => {
        if (response.resultCode !== 0) {
          throw new Error(response.messages[0]);
        }
        return response.data;
      })
      )
  }

  logout(): Observable<any> {
      return this.http.delete(`auth/login`);
  }
}
