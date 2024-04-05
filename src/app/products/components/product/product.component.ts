import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';

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
  constructor(private router: Router, private _productService:ProductsService) {}

  ngOnInit(): void {
    this.looop();
  }

  add() {
    console.log(this.data);
    this.item.emit({ item: this.data, quantity: this.amount });
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


  productData:object={
    "productId":"660da05f9a513d8fb658f688",
      "color":"black"
  };
  addToCart(){
    this._productService.addproducttoCart(this.productData).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }
  

}
