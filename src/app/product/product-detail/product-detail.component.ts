import {Component, OnInit} from '@angular/core';
import {ProductHttpService} from '../../services/product-http.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from 'src/app/models/product.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  // Global Variable
  public data: any;

  constructor(private productHttpService: ProductHttpService,
              // private sharedService: SharedService,
              private route: ActivatedRoute,
              private location: Location) {

  }

  ngOnInit() {
    // this.fetchData();
    this.getProduct();
  }

  cur_product: Product;
  manufatureId: string;
  saleId: string;
  subCateId: string;

  tech_spec_title: any;

  public getProduct() {
    const id = +this.route.snapshot.paramMap.get('id');
    // console.log(id);
    this.productHttpService.getProductById(Number(id))
      .subscribe(
        data => {
          this.cur_product = data;
          console.log(this.cur_product);
          if (data !== null && data !== undefined) {
            this.manufatureId = data.manufacturerId;
            this.saleId = String(data.saleId);
            this.subCateId = String(data.subCategoryID);
          }
        },
        err => {console.log(err)},
        () => {this.getTechTitle(this.subCateId);}
      )
  }

  public getTechTitle(subCateId: string) {
    // const curTechDetail = this.sharedService.getCurentSubCateTech();

  }

  fetchData() {
    const productSummary = this.productHttpService.getProductSummary(1);
    const productSummarysubs =  productSummary.subscribe(response => {
      this.data = response;
      console.log(this.data);
    });
    console.log(productSummary);
    console.log(productSummarysubs);

  }

}
