import { NgModule,Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { LoginComponent } from './auth/components/login/login.component';
import { CartComponent } from './carts/components/cart/cart.component';
import { UserProfileComponent } from './user-profile/Components/user-profile.component';
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';
import { FooterComponent } from './shared/components/footer/footer.component';

const routes: Routes = [
  {path:"products" , component:AllProductsComponent},
  {path:"user-profile", component: UserProfileComponent},
  {path:"details/:id" , component:ProductsDetailsComponent},
  {path:"details" , component:ProductsDetailsComponent},
  {path:"login", component:LoginComponent},
  {path:"carts" , component:CartComponent},
  {path:"order",component:OrderComponent},
  {path:"categories" , component:CategoryComponent},
  {path:'product/:id', component:AllProductsComponent},


  
  // {path:"**" , redirectTo:"products",pathMatch:"full"}
  {path:"**" , redirectTo:"categories",pathMatch:"full"}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
