import { Injectable, OnInit } from "@angular/core";

import { Subject, BehaviorSubject } from "rxjs";


@Injectable()
export class SharedService implements OnInit {

  // curCateAttributeDetail: any;

  constructor() {}
  ngOnInit() {}

  private subCateSource = new BehaviorSubject<number>(0);
  subCate$ = this.subCateSource.asObservable();

  searchProduct(subCateId) {
    this.subCateSource.next(subCateId);
  }

  // setCurentSubCateTech(attributeDetail: any) {
  //   this.curCateAttributeDetail = attributeDetail;
  // }

  // getCurentSubCateTech():any {
  //   return this.curCateAttributeDetail;
  // }
}
