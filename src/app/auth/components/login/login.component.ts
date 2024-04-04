import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
 
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../servics/auth.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Correct property name
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  isSubmitted = false;
  returnUrl = '';
  
  constructor(private formBuilder:FormBuilder,public authService: AuthService, private activatedRoute: ActivatedRoute,private router:Router) {}
  
  ngOnInit(): void {
   this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }
  
  get fc(){
    return this.loginForm.controls;
  }

  login(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;
     
 
    //  this.authService.login({email:this.fc['email'].value, password:this.fc['password'].value}).subscribe(()=>{
    //   this.router.navigateByUrl(this.returnUrl);
    //  });

    this.authService.login({ email: this.fc['email'].value, password: this.fc['password'].value }).pipe(
      tap(
        (user:any) => {
          this.authService.loading=false
        
          this.authService.setUserToLocalStorage(user);
         
          this.authService.userSubject.next(user);
          
          // Check if localStorage is available before using it
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('token', user.token);
          }

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Login successful'
          }).then(() => {
            this.router.navigateByUrl(this.returnUrl);
          });
 
        },
      
        (errorResponse) => {
          this.authService.loading=false
          console.log(errorResponse.error);
         Swal.fire({
           icon: 'error',
           title: 'Error',
           text: errorResponse.error.message
         })
        }
      )
    ).subscribe();
    }
 
 }


