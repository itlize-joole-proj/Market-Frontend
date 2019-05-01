import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable, of, pipe, Subject } from 'rxjs';
import { Attribute } from '../models/attribute.model';
import { catchError, map, tap } from 'rxjs/operators';
import { AttributeDetails } from '../models/attributeDetail.model';

const url = "http://localhost:8080/MarketApp";

import { setting } from '../services/environment';
import { Product } from '../models/product.model';


@Injectable()
export class ProductService implements OnInit {

    private productsSource = new Subject<Product[]>();

    products$ = this.productsSource.asObservable();

    updateProducts(products: Product[]) {
        this.productsSource.next(products);
        console.log("product service");
    }

    ngOnInit() {}
}