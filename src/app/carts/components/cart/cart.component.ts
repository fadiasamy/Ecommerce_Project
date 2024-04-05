import { Component, OnInit } from '@angular/core';
import { parse } from 'node:path';
import { CartsService } from '../../services/carts.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartProducts:any[]=[];
  total:any=0;
  success:boolean=false;
  token:string=localStorage.getItem("token")||" ";
  loading: boolean = false;
  CartsService: any;
  cartsService: any;
    // email:string=localStorage.getItem("email")||" ";
    constructor(private service:CartsService,private router: Router){}
    ngOnInit(): void {
      this.getCartProducts();
    }

    getCartProducts(){
      if (typeof localStorage !== 'undefined') {
          const cartData = localStorage.getItem("Cart");
         if (cartData) {
          this.cartProducts = JSON.parse(cartData);

        }
      }

      this.getcarttotal();

 console.log(this.cartProducts);
    }
// getCartProducts() {
//   this.service.getCart(this.token).subscribe(
//     (response) => {
//       this.cartProducts = response.cartProducts;
//       this.getcarttotal();
//        console.log(this.cartProducts);

//     },
//     (error) => {
//       console.log("Error fetching cart:", error);
//     }
//   );
// }

    addAmount(index:number){
      this.cartProducts[index].quantity++;
      this.getcarttotal();
      localStorage.setItem("Cart",JSON.stringify(this.cartProducts));
    }

    minusAmount(index:number){
      this.cartProducts[index].quantity--;
      this.getcarttotal();
      localStorage.setItem("Cart",JSON.stringify(this.cartProducts));
    }
    goToOrderPage(): void {
      this.router.navigate(['/order'], {
        queryParams: {
          cartProducts: JSON.stringify(this.cartProducts),
          total: this.total
        }
      });
    }

    detectChange(){
      localStorage.setItem("Cart",JSON.stringify(this.cartProducts));
      this.getcarttotal();
    }

    deletProduct(index:number){
      this.cartProducts.splice(index,1);
      localStorage.setItem("Cart",JSON.stringify(this.cartProducts));
      this.getcarttotal();
    }

    clearCart(){
      this.cartProducts=[];
      localStorage.setItem("Cart",JSON.stringify(this.cartProducts));
      this.getcarttotal();

    }


     getcarttotal(){
      this.total=0;
      for(let x in this.cartProducts)
       {
          this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
       }
     // console.log(this.total);
   }

     addCart(){
  let products=this.cartProducts.map(item => {
    return {productId:item.item.id,Color:item.item.color}
  })
  let Model={
    productId:this.cartProducts[0].item._id,
    color:this.cartProducts[0].item.color

  };
  this.service.createNewCart(Model,this.token).subscribe(res => {
     this.success=true;
  })
  console.log(Model);

}
// deleteProduct(productId: number) {
//   this.CartsService.deleteProductFromCart(productId, this.token)
//     .subscribe(
//       () => {
//         console.log('Product deleted successfully.');
//       },
//       (error: any) => {
//         console.error('Error deleting product:', error);
//       }
//     );
// }

// deleteProductD(productId: number) {
//   this.cartsService.deleteProductFromCart(productId)
//     .subscribe(
//       () => {
//         console.log('Product deleted successfully.');
//       },
//       (error: any) => {
//         console.error('Error deleting product:', error);
//       }
//     );
// }

// Delete(id:number,event:any){
//   Swal.fire({
//     text:"Are You Sure You Want To Delete It",
//     showCancelButton:true,
//     confirmButtonText:"yes , Delete It",
//     cancelButtonText:"No Cancel",
//     reverseButtons:true
//   }).then((res)=>{
//     if(res.isConfirmed){
//       this.CartsService.DeleteProduct(id).subscribe({
//         next:(res:any)=>{
//           console.log(res);



//           const Tr=event.target.closest('tr');
//           if(Tr){
//             Tr.remove();
//           }
//           // }

//         }
//       })

//     }
//   })

// }

}







