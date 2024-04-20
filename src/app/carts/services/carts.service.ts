import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http: HttpClient) { }

  createNewCart(model: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: "Bearer " + token,
    });
    return this.http.post(environment.baseApi + 'cart', model, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // getCart(token: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     Authorization: "Bearer " + token,
  //   });
  //   return this.http.get(environment.baseApi + 'cart', { headers }).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  getCart(): Observable<any> {
    const token = localStorage.getItem("token");
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get('https://e-commerce-aibk.onrender.com/api/v1/cart', { headers })
      // return this.http.get('http://localhost:3000/api/v1/cart', { headers })

        .pipe(
          catchError(error => {
            console.error('Error fetching products:', error);
            return throwError(error);
          })
        );
    } else {
      return throwError("User token not found in local storage");
    }
  }

  updateCartItem(item: any, token: string): Observable<any> {
    const { productId, quantity } = item;
    return this.http.patch<any>(
      `${environment.baseApi}cart/${productId}`,
      { quantity },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    ).pipe(
      catchError(this.handleError)
    );
  }


  // deleteCartItem(productId: number, token: string): Observable<any> {
  //   return this.http.delete<any>(`${environment.baseApi}cart/${productId}`, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   }).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  deleteCartItem(productId: number, token: string) {
    return this.http.delete<any>(`${environment.baseApi}cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      catchError((error) => {
        console.log("Error deleting cart item:", error);
        return [];
      }),
      map((response) => {
        console.log("Deleted Product ID:", productId);
        return response;
      })
    );
  }


  clearCart(token: string): Observable<any> {
    return this.http.delete<any>(`${environment.baseApi}cart`, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
