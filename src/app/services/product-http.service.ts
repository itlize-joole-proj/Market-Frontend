import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Attribute } from '../models/attribute.model';
import { catchError, map, tap } from 'rxjs/operators';
import { AttributeDetails } from '../models/attributeDetail.model';

const url = "http://localhost:8080/MarketApp";

@Injectable()
export class ProductHttpService implements OnInit {

  constructor(private httpService: HttpClient) {}

  ngOnInit() {

  }

  showServiceInfo(): void {
    console.log("Product http service working...");
  }

  getFilterAttributes(): Observable<Attribute[]> {
    const category_url = `${url}/attributePart`;
    return this.httpService.get<Attribute[]>(category_url)
        .pipe(
          // tap(res => this.log('' + res)),
          catchError(this.handleError<Attribute[]>('getAttributes', []))
        );
  }

  getFilterAttributeDetails(subCateId: String): Observable<AttributeDetails[]> {
    const category_url = `${url}/filter/${subCateId}`;
    return this.httpService.get<AttributeDetails[]>(category_url)
        .pipe(
          // tap(res => this.log('' + res)),
          catchError(this.handleError<AttributeDetails[]>('getAttributeDetails', []))
        );
  }

  private handleError<T>(operation = "operation", result?: T) {
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
    console.log(message);
  }

}
