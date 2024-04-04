import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient:HttpClient){}

    getCategories(){
      return this.httpClient.get("https://e-commerce-aibk.onrender.com/api/v1/categories")
    }

    getProductsByCategory(id:string){
      return this.httpClient.get(`https://e-commerce-aibk.onrender.com/api/v1/categories/${id}/products`)
    }
}
