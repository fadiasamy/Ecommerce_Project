
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { UserProfileModule } from './user-profile/user-profile.module';
// import { OrderComponent } from './order/order.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ProductsModule } from './products/products.module';
import { RouterModule } from '@angular/router';
import { CartsModule } from './carts/carts.module';

import { CategoryComponent } from './category/category.component';
import { AboutModule } from './about/about.module';
 



@NgModule({
  declarations: [
    AppComponent,
  //  OrderComponent,
   CategoryComponent,
   


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ProductsModule,
    RouterModule,
    CartsModule,
    FormsModule,
    ReactiveFormsModule,
    AboutModule
   
  ],
  providers: [
    provideHttpClient(withFetch())

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
