import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authenticationService.logout();
          // location.reload(true);
          return throwError("UnAuthentication...." + err.error.message || err.statusText);
        }
        if (err.status === 415) {
          // console.log(415);
          this.authenticationService.logout();
          // location.reload(true);
        }

        const error = err.error.message || err.statusText;
        return throwError("Login fail...." + error);
      })
    );
  }
}
