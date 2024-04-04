import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {}

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
}
