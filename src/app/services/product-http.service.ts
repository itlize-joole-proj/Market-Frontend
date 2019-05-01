

import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, pipe} from 'rxjs';
import { AttributeType } from '../models/attributeType.model';

import { catchError, map, tap } from 'rxjs/operators';
import { Attribute } from '../models/attribute.model';

import { Product } from '../models/product.model';



import {baseUrl, setting} from '../services/environment';

const url = 'http://localhost:8080/MarketApp';


@Injectable()
export class ProductHttpService implements OnInit {
  public data: any;

  constructor(private httpService: HttpClient) {
  }


  ngOnInit() {

  }

  showServiceInfo(): void {
    console.log('Product http service working...');
  }

  getFilterAttributes(): Observable<AttributeType[]> {
    const category_url = `${url}/attributePart`;
    return this.httpService.get<AttributeType[]>(category_url)
      .pipe(
        // tap(res => this.log('' + res)),
        catchError(this.handleError<AttributeType[]>('getAttributes', []))
      );
  }

  getFilterAttributeDetails(subCateId: string): Observable<Attribute[]> {
    const category_url = `${url}/filter/${subCateId}`;

    // console.log(category_url);
    return this.httpService.get<Attribute[]>(category_url)
      .pipe(
        // tap(res => this.log('' + res)),
        catchError(this.handleError<Attribute[]>('getAttributeDetails', []))
      );
  }

  getProductsFromFilter(subCateId: string, filterData: any): Observable<Product[]> {
    const product_filter_url = `${url}/filter/${subCateId}`;
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: httpHeaders
    };
    
    console.log(filterData);
    return this.httpService.post<any>(product_filter_url, JSON.stringify(filterData), options)
      .pipe(
        tap(res => this.log('Get Data: ' + res)),
        catchError(this.handleError<Product[]>('Error in get products of filter', []))
      );

    // console.log(filterData);

    return this.httpService.post<Product[]>(product_filter_url, filterData, options)
      .pipe(
        tap(res => this.log('Get Data: ' + res)),
        catchError(this.handleError<Product[]>('Error in get products of filter', []))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
    console.log('error' + message);
  }


  getProducts(subCateId: number): Observable<Product[]> {
    return this.httpService.get<Product[]>(setting.url + `/subcate/${subCateId}/products`)
      .pipe(map(res => res.map(item => new Product(item))));
  }

  getProductById(productID: number): Observable<Product> {
    const product_url = `${url}/products/${productID}`;
    return this.httpService.get<Product>(product_url)
            .pipe(catchError(this.handleError<Product>('Error in getting product by id')));
  }

  // Wei
  getProductSummary(productID: number) {

    // // let productSummary;
    // this.httpService.get(baseUrl + `/products/${productID}`, {responseType: 'json'}).subscribe(response => {
    //   this.data = response;
    //   const productSummary = JSON.stringify(response);
    //   console.log(productSummary);
    //   return productSummary;
    // });

    // return oberservable
    return this.httpService.get(baseUrl + `/products/${productID}`);
  }


  // getProductSummary2(productID: number) {
  //   return new Promise(resolve => {
  //     this.httpService.get(baseUrl + `/products/${productID}`)
  //       .map(results => results.json())
  //       .subscribe(data => {
  //         this.data = data;
  //         resolve(this.data);
  //       })
  //       .then(data => console.log(data));
  //   });
  // }

  getSales(salesID: number) {
    return this.httpService.get(baseUrl + `/sale/${salesID}`);
  }

  getManufacturer(manufacturerID: number) {
    return this.httpService.get(baseUrl + `/manufacturer/${manufacturerID}`);
  }

  // getSubCate(cateName: string): Observable<SubCategory[]>{

  //   return this.http.get<SubCategory[]>('http://localhost:8080/MarketApp' + `/Category/${cateName}/SubCates`)
  //   // .pipe(map(res => res.map((item) => new SubCategory(
  //   //     item.SubCategoryName,
  //   //     item.SubCategoryID,
  //   //     item.CategoryID
  //   // ))));
  //   // .pipe(map(res => res.map(item => new SubCategory(
  //   //     item.SubCategoryName,
  //   //      item.SubCategoryID,
  //   //      item.CategoryID
  //   // ))));
  //   .pipe(map(res => res.map(item => new SubCategory(item))));


}
