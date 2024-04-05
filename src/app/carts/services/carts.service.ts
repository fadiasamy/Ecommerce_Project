import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';


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

  // getCart(token: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     Authorization: "Bearer " + token,
  //   });
  //   return this.http.get(environment.baseApi + 'cart', { headers });
  // }

  // deleteProductFromCart(productId: number, token: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     Authorization: "Bearer " + token,
  //   });
  //   return this.http.delete(environment.baseApi + 'cart/' + productId, { headers });
  // }

  // DeleteProduct(id:number){
  //   const token = localStorage.getItem("token");
  //  if (token) {

  //    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //    const headersOptions = { headers: headers };

  //    return this.http.delete(`https://e-commerce-aibk.onrender.com/api/v1/products/${id},headersOptions`)
  //      .pipe(
  //        catchError(error => {
  //          console.error('Error fetching products:', error);
  //          return throwError(error);
  //        })
  //      );
  //  } else {
  //    return throwError("admin token not found in local storage");
  //  }
  //  }

}






