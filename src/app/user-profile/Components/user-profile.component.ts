import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/servics/auth.service';
import { UserProfileService } from '../services/user-profile.service';

@Component({
 selector: 'app-user-profile',
templateUrl: './user-profile.component.html',
 styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
profile: any = {};
 token: string = localStorage.getItem("token") || " ";
 updatedProfile: any = {email:"",name:"",photo:""};
 editMode: boolean = false;
 loading: boolean = false;

constructor(
private authService: AuthService,
  private userProfileService: UserProfileService
 ) {}

 ngOnInit(): void {
   this.getProfile();
}
getProfile() {
  this.loading = true; // Set loading to true before fetching data
  const token = localStorage.getItem('token') || '';
  this.userProfileService.getProfile(token)
  .subscribe(response => {
  this.profile = response.data;
  console.log('User profile:', this.profile);
  this.loading = false; // Set loading to false after data is fetched
  }, error => {
  console.error('Error fetching profile:', error);
  this.loading = false; // Set loading to false in case of error
  });
  }

//  getProfile() {
//     const profileData = localStorage.getItem("user");
//     if (profileData) {
//     this.profile = JSON.parse(profileData);
//    }
//   console.log(this.profile);
//  }

logOut() {
   localStorage.removeItem("token");
   localStorage.removeItem("user");
}
onFileChange(event: any) {
 const file = event.target.files[0];
 this.updatedProfile.photo = file || this.profile.data.photo;
}
//   updateUserProfile() {
//   this.profile.data.name = this.updatedProfile.name;
//   this.profile.data.email = this.updatedProfile.email;
//  this.profile.data.photo = this.updatedProfile.data.photo ;
//     localStorage.setItem("user", JSON.stringify(this.profile));
//    this.userProfileService.updateProfile(this.profile, this.token)
//    .subscribe(response => {
//     console.log('Profile updated on the server:', response);
//      console.log(this.profile);


//     this.toggleEditMode();
//      }, error => {
//        console.error('Error updating profile:', error);
//     });
//   }
updateUserProfile() {
 if (this.profile && this.profile.data) {
   const formData = new FormData();
   formData.append('name', this.updatedProfile.name);
   formData.append('email', this.updatedProfile.email);
   formData.append('photo', this.updatedProfile.photo);

   this.userProfileService.updateProfile(this.token, formData)
     .subscribe(response => {
       console.log('Profile updated on the server:', response);
       this.toggleEditMode();
     }, error => {
       console.error('Error updating profile:', error);
     });
 }
}

 toggleEditMode() {
   this.editMode = !this.editMode;
  if (this.editMode) {
    this.updatedProfile = { ...this.profile.user };
  }
 }

 cancelEditMode() {
   this.editMode = false;
 }
}












