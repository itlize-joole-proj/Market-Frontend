import {Injectable, OnInit} from '@angular/core';

import { BehaviorSubject } from 'rxjs';

const url = "http://localhost:8080/MarketApp";

import { setting } from '../services/environment';
import { Product } from '../models/product.model';


@Injectable()
export class ProductService implements OnInit {

    private productsSource = new BehaviorSubject<Product[]>([]);
    private comparesSource = new BehaviorSubject<[]>([]);

    products$ = this.productsSource.asObservable();
    compares$ = this.comparesSource.asObservable();

    updateProducts(products: Product[]) {
        this.productsSource.next(products);
        // console.log("product service");
    }

    compareProducts(compares: []) {
        this.comparesSource.next(compares);
    }

    ngOnInit() {}
}
