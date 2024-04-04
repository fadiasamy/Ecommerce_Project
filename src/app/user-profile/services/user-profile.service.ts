import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private apiUrl = environment.baseApi + 'users/profile';

  constructor(private http: HttpClient) {}
  getProfile(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl, { headers });
  }

  updateProfile(token: string,profile: any): Observable<any> {
    const headers = { Authorization: `Bearer ${token}` };
    console.log(profile);
    return this.http.patch<any>(this.apiUrl,profile,{headers});
    console.log(profile);

  }
}






