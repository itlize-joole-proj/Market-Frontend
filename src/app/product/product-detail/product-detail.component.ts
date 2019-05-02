import {Component, OnInit} from '@angular/core';
import {ProductHttpService} from '../../services/product-http.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Product} from 'src/app/models/product.model';
import {SharedService} from 'src/app/services/shared.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  // Global Variable
  public product: any;
  public manufacturer: any;
  public sales: any;
  cur_product: Product;
  manufatureId: string;
  saleId: string;
  subCateId: string;

  tech_spec_title: any;

  constructor(private productHttpService: ProductHttpService,
              // private sharedService: SharedService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.fetchProductData();
    this.fetchSalesData();
    this.fetchManufacturerData();
  }

  fetchProductData() {
    const productSummary = this.productHttpService.getProductSummary(1);
    const productSummarysubs = productSummary.subscribe(response => {
      this.product = response;
      console.log(this.product);
      console.log(typeof (this.product));
      // this.fetchData();
      this.getProduct();
    });
  }

  getProduct() {
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
        err => {
          console.log(err);
        },
        () => {
          this.getTechTitle(this.subCateId);
        }
      );
  }

  public getTechTitle(subCateId: string) {
    // const curTechDetail = this.sharedService.getCurentSubCateTech();

  }

  fetchData() {
    const productSummary = this.productHttpService.getProductSummary(1);
    const productSummarysubs = productSummary.subscribe(response => {
      this.product = response;
      console.log(this.product);
    });
    console.log(productSummary);
    console.log(productSummarysubs);
  }


  fetchSalesData() {
    console.log(this.product.saleId);
    this.productHttpService.getSales(this.product.saleId).subscribe(response => {
      this.sales = response;
      console.log(this.sales);
    });
  }

  fetchManufacturerData() {
    this.productHttpService.getManufacturer(this.product.manufacturerId).subscribe(response => {
      this.manufacturer = response;
      console.log(this.manufacturer);
    });
  }


}
