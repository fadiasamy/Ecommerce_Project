import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }
  createNewCart(Model:any,token:string){
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
     Authorization: "Bearer "+token,
    });
    return this.http.post(environment.baseApi + 'cart',Model,{headers});
  }
}
