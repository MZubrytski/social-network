import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/shared/models/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

    getProfile(userId: number): Observable<Profile> {
        return this.http.get<Profile>(`profile/${userId}`);
    }

    savePhoto(photoFile: File): Observable<any> {
        const formData = new FormData();
        formData.append("image", photoFile);

        return this.http.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    saveProfile(profile: Profile): Observable<any> {
        return this.http.put(`profile`, profile );
    }
}
