import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../products/services/models/User';
import { IUserLogin } from '../../products/services/interfaces/IUserLogin';
import Swal from 'sweetalert2';
import { IUserRegister } from '../../shared/interfaces/IUserRegister';


const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  CurrentUser !:User;
  loading: boolean = false;

  public userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient) {
    this.userObservable = this.userSubject.asObservable();
  }



  login(userLogin: IUserLogin): Observable<User> {
    this.loading = true;
    return this.http.post<User>(`${environment.baseApi}users/login`, userLogin);
    // .pipe(
    //   tap({
    //     next: (user) => {
    //       this.loading=false
    //       Swal.fire({
    //         icon: 'success',
    //         title: 'Success',
    //         text: 'Login successful'
    //       });
    //       this.setUserToLocalStorage(user);

    //       this.userSubject.next(user);

    //       // Check if localStorage is available before using it
    //       if (typeof localStorage !== 'undefined') {
    //         localStorage.setItem('token', user.token);
    //       }


    //     },
    //     error: (errorResponse) => {
    //       this.loading=false
    //        console.log(errorResponse.error);
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Error',
    //         text: errorResponse.error.message
    //       })
    //        // Return an observable to continue the observable chain
    //     }
    //   })
    // );
    }

    register(userRegister: IUserRegister): Observable<User>{
      this.loading = true;

      return this.http.post<User>(`${environment.baseApi}users/register`, userRegister);
      // .pipe(tap({
      //   next:(user)=>{
      //     console.log(user);
      //     this.setUserToLocalStorage(user);
      //     this.userSubject.next(user);
      //     Swal.fire({
      //       icon: 'success',
      //       title:'Register Successful',
      //       text: 'Welecome to Glamora'
      //     });
      //   },
      //     error:(errorResponse)=>{
      //       console.log(userRegister);
      //       Swal.fire({
      //         icon: 'error',
      //         title: 'Error',
      //         text: errorResponse.error.message
      //       });

      //   }
      // })
      // )
    }

    logout(){
      this.userSubject.next(new User());
     if (typeof localStorage !== 'undefined' && localStorage !== null){
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem('token');
      }
      window.location.reload();
    }
    public setUserToLocalStorage(user: User) {
      // Check if localStorage is available before using it
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      }
    }

    public getUserFromLocalStorage(): User {
      // Check if localStorage is available before using it
      if (typeof localStorage !== 'undefined') {
        const userJson = localStorage.getItem(USER_KEY);
        if (userJson) return JSON.parse(userJson) as User;
      }
      return new User();
    }
  }

