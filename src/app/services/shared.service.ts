import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SharedService implements OnInit{
    ngOnInit() {

    }
    constructor(){}

    private subCateSource = new Subject<number>();
    subCate$ = this.subCateSource.asObservable();

    searchProduct(subCateId) {
        this.subCateSource.next(subCateId);
    }
}