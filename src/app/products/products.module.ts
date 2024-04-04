import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './components/product/product.component';


@NgModule({
  declarations: [
    AllProductsComponent,
    ProductsDetailsComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    SharedModule

  ],
  exports: [
    AllProductsComponent,
    ProductsDetailsComponent
  ]
})
export class ProductsModule { }








