// import { Component, OnInit } from '@angular/core';
// import { ProductsService } from '../../services/products.service';
// import { json } from 'node:stream/consumers';
// import { Router } from '@angular/router';



// @Component({
//   selector: 'app-all-products',
//   templateUrl: './all-products.component.html',
//   styleUrl: './all-products.component.css'
// })
// export class AllProductsComponent implements OnInit {
//   products: any[] = [];
//   loading:boolean=false;
//   cartProducts:any[]=[];

//   constructor(private service:ProductsService){}
//   ngOnInit(): void {
//     this.getProducts();
//   }
//   getProducts(){
//     this.loading=true;
//     this.service.getAllProducts().subscribe((res:any) => {
//       this.products=res.data.allProducts;
//       this.loading=false;
//       // console.log(this.products);
//       // console.log(res.data.allProducts[0].images[0])
//      }, error =>{
//       this.loading=false;
//       console.log(error.message);
//      })
//   }
//   addtocart(event:any){
//     console.log(event);
//     if("Cart" in localStorage){
//       this.cartProducts=JSON.parse(localStorage.getItem("Cart")!);
//       let exist=this.cartProducts.find(item => item.item.id == event.item.id);
//       if(exist){alert ("Product is already in your cart!!")}
//       else{
//         this.cartProducts.push(event);
//         localStorage.setItem("Cart",JSON.stringify(this.cartProducts));
//       }

//     }else{
//       this.cartProducts.push(event);
//       localStorage.setItem("Cart",JSON.stringify(this.cartProducts));
//     }

//   }
//    }











import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  loading: boolean = false;
  cartProducts: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private service: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.loading = true;
    this.service.getAllProducts(this.currentPage).subscribe((res: any) => {
      console.log(res)
      this.products = res.data.allProducts;
      this.loading = false;
      this.currentPage = res.currentPage;
      this.totalPages = res.totalPages;
    }, error => {
      this.loading = false;
      console.log(error.message);
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getProducts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getProducts();
    }
  }

  addtocart(event: any): void {
    console.log(event);
    if ("Cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("Cart")!);
      let exist = this.cartProducts.find(item => item.item.id == event.item.id);
      if (exist) {
        alert("Product is already in your cart!!");
      } else {
        this.cartProducts.push(event);
        localStorage.setItem("Cart", JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem("Cart", JSON.stringify(this.cartProducts));
    }
  }
}
