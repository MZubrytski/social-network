import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

   getUsers(currentPage = 1, pageSize = 10): Observable<{items: User[], totalCount: number}> {
    return this.http.get<{items: User[], totalCount: number}>(`users?page=${currentPage}&count=${pageSize}`)
  }

  follow(userId: number): Observable<any> {
    return this.http.post(`follow/${userId}`, {}).pipe(tap((data) => {
      console.log('data', data)
    }))
  }

  unfollow(userId: number): Observable<any> {
      return this.http.delete(`follow/${userId}`)
  }
}
