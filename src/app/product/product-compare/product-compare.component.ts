import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-compare',
  templateUrl: './product-compare.component.html',
  styleUrls: ['./product-compare.component.css']
})
export class ProductCompareComponent implements OnInit {

  productsToCompare: [] = [];
  testBoolean: boolean;
  attributes: string[] = ['Manufacturer', 'Series', 'Model'];

  constructor(private productService: ProductService) { 
    this.testBoolean = false;
    this.productService.compares$.subscribe(
      item => {
        this.productsToCompare = item;
        this.testBoolean = true;
        console.log(this.productsToCompare);
      }
    );
    console.log("constructor");
  }

  ngOnInit() {
  }

}
