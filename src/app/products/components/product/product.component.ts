import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() data: any = {};
  @Output() item = new EventEmitter<any>();
  addButton: boolean = false;
  amount: number = 0;
  addButtonClicked: boolean = false;
  constructor(private router: Router, private _productService:ProductsService) {}

  ngOnInit(): void {
    this.looop();
  }
  // productData:object={productId:this.data.id,
  //   color:"black"}
  // addCart(){
  //   this._productService.addproducttoCart(this.productData).subscribe({
  //     next:(res)=>{
  //       console.log(res)
  //     },
  //     error:(e)=>{
  //       console.log(e)
  //     }
  //   });
  // }

  addToCart(productData:object){
    this._productService.addproducttoCart(productData).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }
  // add() {
  //   // console.log(this.data);
  //   this.item.emit({ item: this.data, quantity: this.amount });
  //   this.addToCart({ productId: this.data.id, color: 'black' });
  // }
  add() {
    if (!this.addButtonClicked) {
      this.item.emit({ item: this.data, quantity: this.amount });
      this.addToCart({ productId: this.data.id, color: 'black' });
      this.addButtonClicked = true;

      Swal.fire({
        title: 'Dear customer',
        text: 'If you want to add the same item again, simply click the Add button again.',
        icon: 'info'
      });
    }
  }


  onview(id: any) {
    this.router.navigate(['/details', id]);
  }
  looop() {
    let aaa = document.querySelectorAll('.aaa');
    for (let i = 0; i < aaa.length; i++) {
      const element = aaa[i];
      if (i % 2 === 0) {
        element.classList.add('parent-btns2');
        // console.log('first');
      } else {
        // console.log('sconds');
        element.classList.add('parent-btns');
      }
    }
  }
}
