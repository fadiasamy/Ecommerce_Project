import { Component, OnInit } from '@angular/core';
import { Category } from './modules/category';
import { ServiceService } from './service.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  allCategors:Category[]=[];
  termControl: FormControl = new FormControl('');
  filteredProducts: any[] = [];
  term:string='';
  allCategories:any[]=[];




  constructor(private service:ServiceService) {


  }

  ngOnInit(): void {
    this.findAllCategories();
  }

  findAllCategories(){
    this.service.getCategories().subscribe({
      next:(result:any)=>{
        this.allCategors=result;
        this.allCategories=result.slice(0,4);
        console.log(result);
        this.searchProducts(' ');
        this.termControl.valueChanges.subscribe((value: string) => {
          this.searchProducts(value);
          console.log(this.allCategors)
        });
      }})
  }


  searchProducts(term: string): void {
    if (!term.trim()) {
      // If search term is empty, show all products
      this.filteredProducts = this.allCategories;
    } else {
      // Filter products based on search term
      this.filteredProducts = this.allCategories.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    }
  }
}
