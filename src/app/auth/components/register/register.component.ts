import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servics/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordsMatchValidator } from '../../../shared/Validation/Password_Match_Validator';
import { tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(private formBuilder: FormBuilder, public authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

 ngOnInit(): void {
   this.registerForm = this.formBuilder.group({
     name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]*$/)]],
     email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.(com|org|net|edu|gov|mil|biz|info)$/)]],
     password: ['', [Validators.required, Validators.minLength(8)]],
     confirmPassword: ['', Validators.required]
   }, {
     validators: PasswordsMatchValidator('password', 'confirmPassword')
   });

   this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
 }

 get fc() {
   return this.registerForm.controls;
 }

 register() {

   this.isSubmitted = true;
   if (this.registerForm.invalid){
     console.log(this.registerForm.invalid);
     console.log("data not valid");
     return;
   }

   const formValue = this.registerForm.value;
   
   const user: IUserRegister = {
     name: formValue.name,
     email: formValue.email,
     password: formValue.password,
     passwordConfirm: formValue.confirmPassword
   };

   this.authService.register(user).pipe(tap(
    (user)=>{
       this.authService.loading=false

       console.log(user);
       this.authService.setUserToLocalStorage(user);
       this.authService.userSubject.next(user);
       if (typeof localStorage !== 'undefined') {
        localStorage.setItem('token', user.token);
      }
       Swal.fire({
         icon: 'success',
         title:'Register Successful',
         text: 'Welecome to Glamora'
       }).then(() => {
         this.router.navigateByUrl(this.returnUrl);
       });
     },
      (errorResponse)=>{
         this.authService.loading=false
          Swal.fire({
           icon: 'error',
           title: 'Error',
           text: errorResponse.error.message
         });
       }
     )
    ).subscribe();
   }
}
