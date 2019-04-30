import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { HttpClient } from '@angular/common/http';
import { ProductHttpService } from '../services/product-http.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private sharedService: SharedService,
              private http: HttpClient,
              private productHttpServie: ProductHttpService) { 
    this.sharedService.subCate$.subscribe(id => {
      productHttpServie.getProducts(id).subscribe(data => console.log(data));
    })
  }

  ngOnInit() {

  }

}
