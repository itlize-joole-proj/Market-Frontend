import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProductHttpService implements OnInit {

  constructor(private httpService: HttpClient) {
  }

  ngOnInit() {

  }

  showServiceInfo(): void {
    console.log('Product http service working...');
  }

}
