import { Component, OnInit } from '@angular/core';
import { ProductHttpService } from 'src/app/services/product-http.service';
import { Attribute } from 'src/app/models/attribute.model';
import { AttributeDetails } from 'src/app/models/attributeDetail.model';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  attributes: Attribute[];
  attributeDetails: AttributeDetails[];
  filter = {};

  constructor(private productService: ProductHttpService) { }

  ngOnInit() {
    this.getAttributeDetails();
    this.getFilterAttributes();
  }

  getFilterAttributes() {
    this.productService.getFilterAttributes().subscribe(
      data => {
        this.attributes = data;
        data.forEach(element => {
          // console.log(element)
          this.filter[element.attributeTypeName] =
                    this.attributeDetails.filter(data=>data.attributeTypeId===element.attributeTypeID);
        });
      }
    );
  }

  getAttributeDetails() {
    this.productService.getFilterAttributeDetails('1').subscribe(
      data => {this.attributeDetails = data;}
    );
  }

  show() {
    console.log(this.attributes);
    console.log(this.attributeDetails)
    console.log(this.attributeDetails.forEach(
      data=>console.log(data.maxValue)
    ));
    // this.buildFilter()
  }

}
