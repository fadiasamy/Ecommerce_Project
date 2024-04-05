// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from '../../../environments/environment';


// @Injectable({
//   providedIn: 'root'
// })

// export class ProductsService {

//   constructor(private http:HttpClient) {

//   }


//   getAllProducts(){
//     return this.http.get(environment.baseApi +'products');
//   }
//   getProductById(id:any){
//        return this.http.get(environment.baseApi + 'products/'+id);
//   }
// }




import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts(page: number = 1, limit: number = 10, sortField: string = 'createdAt', sortOrder: string = 'desc') {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sortField', sortField)
      .set('sortOrder', sortOrder);

    return this.http.get(environment.baseApi + 'products', { params: params });
  }

  getProductById(id: any) {
    return this.http.get(environment.baseApi + 'products/' + id);
  }



  addproducttoCart(productData:object):Observable<any>{
    const token = localStorage.getItem("token");
   if (token) {
    
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     const headersOptions = { headers: headers };
  
     return this.http.post('https://e-commerce-aibk.onrender.com/api/v1/cart',productData, headersOptions)
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
}
