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
  token: string = "";

  updatedProfile: any = { email: "", name: "", photo: "" };
  editMode: boolean = false;
  loading: boolean = false;
  orderHistory: any[] = [];
  showOrderHistory: boolean = false;

  constructor(
    private authService: AuthService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.authService.userSubject.subscribe(user => {
      if (user && user.token) {
        this.token = user.token;
        console.log('Current user token:', this.token);
        this.getProfile();
      }
    });
  }

  getProfile() {
    this.loading = true;
    this.userProfileService.getProfile(this.token)
      .subscribe(response => {
        this.profile = response.data;
        console.log('User profile:', this.profile);
        this.loading = false;
      }, error => {
        console.error('Error fetching profile:', error);
        this.loading = false;
      });
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.updatedProfile.photo = file || this.profile.data.photo;
  }

  updateUserProfile() {
    if (this.profile && this.profile.data) {
      const formData = new FormData();
      formData.append('name', this.updatedProfile.name);
      formData.append('email', this.updatedProfile.email);
      formData.append('photo', this.updatedProfile.photo);

      this.userProfileService.updateProfile(this.token,formData)
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

  toggleOrderHistory() {
    this.showOrderHistory = !this.showOrderHistory;
    if (this.showOrderHistory) {
      this.getOrderHistory();
    }
  }

  getOrderHistory() {
    this.loading = true;
    const userId = this.profile.data.id;
    console.log(this.token);
    this.userProfileService.getOrdersByUserId(this.token, userId)
      .subscribe(response => {
        this.orderHistory = response.data;
        console.log('Order history:', this.orderHistory);
        this.loading = false;
      }, error => {
        console.error('Error fetching order history:', error);
        this.loading = false;
      });
  }
}
