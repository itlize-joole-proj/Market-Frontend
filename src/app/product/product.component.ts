
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { HttpClient } from '@angular/common/http';
import { ProductHttpService } from '../services/product-http.service';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  subCateId: number;
  products: Product[];

  constructor(private sharedService: SharedService,
              private http: HttpClient,

              private productHttpServie: ProductHttpService,
              private productService: ProductService) {
              }

  ngOnInit() {
    this.sharedService.subCate$.subscribe(id => {
      this.subCateId = id;
      this.productHttpServie.getProducts(id).subscribe(
        data => {
          this.products = data;
          this.productService.updateProducts(data);
          });
    });
  }

}
