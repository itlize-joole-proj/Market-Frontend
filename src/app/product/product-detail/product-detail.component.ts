import {Component, OnInit} from '@angular/core';
import {ProductHttpService} from '../../services/product-http.service';


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

  constructor(private service: ProductHttpService) {

  }

  ngOnInit() {
    this.fetchProductData();
    this.fetchSalesData();
    this.fetchManufacturerData();
  }

  fetchProductData() {
    const productSummary = this.service.getProductSummary(1);
    const productSummarysubs = productSummary.subscribe(response => {
      this.product = response;
      console.log(this.product);
      console.log(typeof (this.product));
    });
    console.log(productSummary);
    console.log(productSummarysubs);
  }


  fetchSalesData() {
    console.log(this.product.saleId);
    this.service.getSales(this.product['saleId']).subscribe(response => {
      this.sales = response;
      console.log(this.sales);
    });
  }

  fetchManufacturerData() {
    this.service.getManufacturer(this.product.manufacturerId).subscribe(response => {
      this.manufacturer = response;
      console.log(this.manufacturer);
    });
  }


}
