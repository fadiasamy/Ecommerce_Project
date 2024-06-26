import { NgModule,Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { LoginComponent } from './auth/components/login/login.component';
import { CartComponent } from './carts/components/cart/cart.component';
import { UserProfileComponent } from './user-profile/Components/user-profile.component';
// import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { authGuard } from './auth/components/guards/auth-guard.guard';
import { AboutComponent } from './about/about/about.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {path:"products" , component:AllProductsComponent},
  {path:"user-profile", component: UserProfileComponent, canActivate:[authGuard]},
  {path:"details/:id" , component:ProductsDetailsComponent},
  {path:"details" , component:ProductsDetailsComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"carts" , component:CartComponent, canActivate:[authGuard]},
  // {path:"order",component:OrderComponent, canActivate:[authGuard]},
  {path:"categories" , component:CategoryComponent},
   {path:'product/:id', component:AllProductsComponent},
  {path:'about', component:AboutComponent},
  {path:'notFound', component:NotFoundComponent},

 
  // {path:'product/:id', component:AllProductsComponent},
  { path: 'categories/:id/products', component: AllProductsComponent },
  // { path: 'product/:id', redirectTo: 'details/:id' },
 
 

  {path:"**" , redirectTo:"categories",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
