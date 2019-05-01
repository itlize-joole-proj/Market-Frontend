
import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";

import { catchError, map, tap } from "rxjs/operators";
const url = "http://localhost:8080/MarketApp";

@Injectable()
export class AuthenticationService implements OnInit {
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  userHttpInfo(): void {
    console.log('User http service...');
  }

  login(name, pwd) {
    const buyer = {
      username: name,
      password: pwd
    };
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {
      headers: httpHeaders
    };
    return this.http.post<any>('http://localhost:8080/MarketApp/login', JSON.stringify(buyer), options)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  /* Wei Chen 4.29 */
  register(name, pwd, eml, fname, lname) {
    const buyer = {
      username: name,
      password: pwd,
      email: eml,
      firstname: fname,
      lastname: lname
    };
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {
      headers: httpHeaders
    };
    return this.http.post<any>('http://localhost:8080/MarketApp/register', JSON.stringify(buyer), options)
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('newUser', JSON.stringify(user));
        }
        return user;
      }));
    }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");

  }

  getTest(): void {
    this.http
      .get('http://localhost:8080/MarketApp/products/1')
      .subscribe(data => {
        console.log(data);
      });
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
