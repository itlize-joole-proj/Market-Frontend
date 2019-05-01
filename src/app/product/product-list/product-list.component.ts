import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { HttpClient } from '@angular/common/http';
import { ProductHttpService } from '../../services/product-http.service';
import { Product } from '../../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  private products: any;
  private productsToCompare: any;

  constructor(private sharedService: SharedService,
    private http: HttpClient,
    private productHttpServie: ProductHttpService,
    private productService: ProductService) { 
      // this.products.push(new Product(3));
      // productService.products$.subscribe(item => {
      //   this.products = item;
      //   console.log(item);
      //   console.log(this.products);
      //   console.log("list service");
      // });
    }

  // @Input('products') products: Product[]; 
  


  ngOnInit() {
    this.http.get('http://localhost:8080/MarketApp/subcate/1/products').subscribe(res=> {
      this.products = res;
      console.log(this.products)

    })
    // this.productService.products$.subscribe(item => {
    //   this.products = item;
    //   console.log(item);
    //   console.log(this.products);
    //   console.log("list service");
    // });
    // console.log(this.products + 'on');
  }

}
