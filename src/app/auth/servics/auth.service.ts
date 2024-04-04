import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../products/services/models/User';
import { IUserLogin } from '../../products/services/interfaces/IUserLogin';
import Swal from 'sweetalert2';
const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  CurrentUser !:User;
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(`${environment.baseApi}users/login`, userLogin).pipe(
      tap({
        next: (user) => {
          
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          
          // Check if localStorage is available before using it
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('token', user.token);
          }
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Login successful'
          });
        },
        error: (errorResponse) => {
          console.log(errorResponse.error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorResponse.error.message
          });
        }
      })
    );
  }
  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
  private setUserToLocalStorage(user: User) {
    // Check if localStorage is available before using it
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  private getUserFromLocalStorage(): User {
    // Check if localStorage is available before using it
    if (typeof localStorage !== 'undefined') {
      const userJson = localStorage.getItem(USER_KEY);
      if (userJson) return JSON.parse(userJson) as User;
    }
    return new User();
  }
}

