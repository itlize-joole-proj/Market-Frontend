import { Component, OnInit, Inject } from '@angular/core';
import { ProductHttpService } from 'src/app/services/product-http.service';
import { AttributeType } from 'src/app/models/attributeType.model';
import { Attribute } from 'src/app/models/attribute.model';

import { FormBuilder } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

import { Filter } from 'src/app/models/filter.model';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  attributes: AttributeType[];
  attributeDetails: Attribute[];
  filter = {};
  rangeFilterList;
  filterData = {};
  subId = '1';

  constructor(private productService: ProductHttpService,
              private formBuilder: FormBuilder,
              @Inject(DOCUMENT) document) { }
  // test: Filter = new Filter(10, 20);
  ngOnInit() {
    this.getAttributeDetails();
    // this.getFilterAttributes();
  }

  onFilterSubmit() {
    console.log("Submit Filter");
    this.rangeFilterList.forEach(
      element=>{
        // each filt element
        const leftId = 'left-' + element.attributeName;
        const rightId = 'right-' + element.attributeName;
        const leftVal = <HTMLInputElement>document.getElementById(leftId);
        const rightVal = <HTMLInputElement>document.getElementById(rightId);
        if (leftVal !== null && rightVal != null) {
          const temp = {};
          temp["min"] = Number(leftVal.value);
          temp["max"] = Number(rightVal.value);
          // console.log(String(element.attributeName));
          this.filterData[String(element.attributeName).replace(' ', '')] = temp;
        }
      }
    )
    // save filter data into localStorage, easy for sibling get the data
    localStorage.setItem("filter", JSON.stringify(this.filterData));
    this.getProductsOfFilter();
  }

  getProductsOfFilter() {
    this.productService.getProductsFromFilter(this.subId, localStorage.getItem('filter'))
    .subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => console.log("filter result complete...")
    )
  }

  getFilterAttributes() {
    this.productService.getFilterAttributes()
    .subscribe(
      data => {
        this.attributes = data;
        data.forEach(element => {
          // console.log(element)
          if (this.attributeDetails !== undefined) {
            this.filter[element.attributeTypeName] =
                      this.attributeDetails.filter(data=>data.attributeTypeId===element.attributeTypeID);
          }
        });
      },
      err => {},
      // () => console.log('Observer got a complete notification'),
    );
  }

  getAttributeDetails() {
    this.productService.getFilterAttributeDetails(this.subId).subscribe(
      data => {
        this.attributeDetails = data;
        if (this.attributeDetails !== null && this.attributeDetails !== undefined) {
          this.rangeFilterList = this.attributeDetails.filter(data=>data.isRange === 1);
          this.attributeDetails.forEach(
            data=>{data['rangeSlider']=new Filter(data.minValue, data.maxValue)}
          )
          // console.log(this.rangeFilterList)
        } else {
          console.log("Refreshing...")
          window.location.reload();
        }
      },
      err => {console.log(err)},
      () => this.getFilterAttributes(),
    );
  }

}
