import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { setting } from '../services/environment';

@Injectable()
export class ProductHttpService implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit() {

  }

  showServiceInfo(): void {
    console.log("Product http service working...");
  }

  getProducts(subCateId: number) {
    return this.http.get(setting.url + `/subcate/${subCateId}/products`);
  }

}
