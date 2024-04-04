import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
 
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../servics/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Correct property name
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  isSubmitted = false;
  returnUrl = '';
  constructor(private formBuilder:FormBuilder,private authService: AuthService, private activatedRoute: ActivatedRoute,private router:Router) {}
  
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
    console.log(`email :${this.fc['email'].value}, password :${this.fc['password'].value}`)
  
     this.authService.login({email:this.fc['email'].value, password:this.fc['password'].value}).subscribe(()=>{
      this.router.navigateByUrl(this.returnUrl);
     });
  }
 
 }


