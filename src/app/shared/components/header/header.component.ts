import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/servics/auth.service';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  user!:any;
  constructor(private authService:AuthService){
   authService.userObservable.subscribe((newUser)=>{
      this.user = newUser;
      
   });
    
  }
  ngOnInit(){}
  logout(){
    this.authService.logout();
  }
  get isAuth(){
    return this.user.token;
  }
}
