// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { OrderService } from '../order.service';

// @Component({
//   selector: 'app-order',
//   templateUrl: './order.component.html',
//   styleUrls: ['./order.component.css']
// })
// export class OrderComponent implements OnInit {
//   cartProducts: any[] = [];
//   total: number = 0;

//   constructor(private route: ActivatedRoute, private orderService: OrderService) {}

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       if (params && params['cartProducts'] && params['total']) {
//         this.cartProducts = JSON.parse(params['cartProducts']);
//         this.total = +params['total'];
//       }
//     });
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { OrderService } from '../order.service';

// @Component({
//   selector: 'app-order',
//   templateUrl: './order.component.html',
//   styleUrls: ['./order.component.css']
// })
// export class OrderComponent implements OnInit {
//   cartProducts: any[] = [];
//   total: number = 0;

//   constructor(private route: ActivatedRoute, private orderService: OrderService) {}

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       if (params && params['cartProducts'] && params['total']) {
//         this.cartProducts = JSON.parse(params['cartProducts']);
//         this.total = +params['total'];
//       }
//     });
//   }

//   cancelProduct(index: number): void {
//     if (confirm("Are you sure you want to cancel this product?")) {
//       // Remove the product from the cartProducts array
//       this.cartProducts.splice(index, 1);
//       // You may need to update the cart service as well
//     }
//   }
//2222
// }






import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  cartProducts: any[] = [];
  total: number = 0;
  orderData: any = {}; // Variable to store order data
  showPaymentButton: boolean = false; // Add this property


  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params && params['cartProducts'] && params['total']) {
        this.cartProducts = JSON.parse(params['cartProducts']);
        this.total = +params['total'];
      }
    });

  }

  cancelProduct(index: number): void {
    if (confirm("Are you sure you want to cancel this product?")) {
      this.cartProducts.splice(index, 1);
    }
  }

  confirmOrder(): void {
    // Prepare order data
    this.orderData.products = this.cartProducts.map(product => ({
      productId: product.item.id,
      quantity: product.quantity
    }));
    this.orderData.total = this.total;

    // Log orderData to console
    console.log(this.orderData);

    // Call placeOrder function from OrderService
    this.orderService.placeOrder(this.orderData).subscribe(response => {
      // Handle response as needed
      console.log("Order placed successfully:", response);
    }, error => {
      // Handle error as needed
      console.error("Error placing order:", error);
      this.showPaymentButton = true;

    });
  }



  }




