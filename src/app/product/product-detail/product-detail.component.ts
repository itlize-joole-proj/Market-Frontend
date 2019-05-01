import {Component, OnInit} from '@angular/core';
import {ProductHttpService} from '../../services/product-http.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  // Global Variable
  public data: any;

  constructor(private service: ProductHttpService) {

  }

  ngOnInit() {
    this.fetchData();

  }

  fetchData() {
    const productSummary = this.service.getProductSummary(1);
    const productSummarysubs =  productSummary.subscribe(response => {
      this.data = response;
      console.log(this.data);
    });
    console.log(productSummary);
    console.log(productSummarysubs);

  }

}
