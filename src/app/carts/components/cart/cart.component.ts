import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from '../../services/carts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: any[] = [];
  total: number = 0;
  success: boolean = false;
  loading: boolean = false;
  token: string = localStorage.getItem("token") || "";

  constructor(private service: CartsService, private router: Router) {}

  ngOnInit(): void {
    // this.getCartProducts();
    // console.log(this.cartProducts);
    this.service.getCart().subscribe({
      next: (res) => {
        this.cartProducts = res.data.cartItems;
        this.calculateTotal();
        console.log(this.cartProducts);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  // getCartProducts() {
  //   this.loading = true;
  //   this.service.getCart(this.token).subscribe(
  //     (response) => {
  //       this.cartProducts = response.cartProducts;
  //       console.log(`cartProducts:${this.cartProducts}`);
  //       this.getCartTotal();
  //       this.loading = false;
  //     },
  //     (error) => {
  //       console.log("Error fetching cart:", error);
  //       this.loading = false;
  //     }
  //   );
  // }


  getCartTotal() {
    this.total = 0;
    for (let product of this.cartProducts) {
      this.total += product.price * product.quantity;
    }
  }

  calculateTotal() {
    this.total = this.cartProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
      // console.log('Total:', this.total);

    }, 0);
  }
  detectChange() {
    this.calculateTotal();
  }

  addAmount(item: any) {
    item.quantity++;
    this.updateCartItem(item);
  }

  minusAmount(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartItem(item);
    }
  }

  updateCartItem(item: any) {
    this.service.updateCartItem(item, this.token).subscribe(
      (response) => {
        this.calculateTotal();
      },
      (error) => {
        console.log("Error updating cart item:", error);
      }
    );
  }

  deleteProduct(productId: number) {
    Swal.fire({
      text: "Are you sure you want to delete it?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
      reverseButtons: true
    }).then((res) => {
      if (res.isConfirmed) {
        this.service.deleteCartItem(productId, this.token).subscribe(
          (response) => {
            this.cartProducts = this.cartProducts.filter(item => item.item.id !== productId);
            this.getCartTotal();
          },
          (error) => {
            console.log("Error deleting cart item:", error);
          }
        );
      }
    });
  }

  clearCart() {
    Swal.fire({
      text: "Are you sure you want to clear the cart?",
      showCancelButton: true,
      confirmButtonText: "Yes, clear it",
      cancelButtonText: "No, cancel",
      reverseButtons: true
    }).then((res) => {
      if (res.isConfirmed) {
        this.service.clearCart(this.token).subscribe(
          (response) => {
            this.cartProducts = [];
            this.total = 0;
          },
          (error) => {
            console.log("Error clearing cart:", error);
          }
        );
      }
    });
  }

  goToOrderPage(): void {
    this.router.navigate(['/order'], {
      queryParams: {
        cartProducts: JSON.stringify(this.cartProducts),
        total: this.total
      }
    });
  }

  addCart() {
    const products = this.cartProducts.map(item => {
      return { productId: item.item.id, Color: item.item.color };
    });

    const model = {
      productId: this.cartProducts[0].item._id,
      color: this.cartProducts[0].item.color
    };

    this.service.createNewCart(model, this.token).subscribe(res => {
      this.success = true;
    });
  }
}
