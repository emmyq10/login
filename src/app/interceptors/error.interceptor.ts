import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('HTTP Error:', error);
      if(error.status === 400) {
        alert('Bad Request');
      }
      else if(error.status === 401) {
        alert('Unauthorized User');
      }
      else if(error.status === 403) {
        alert('Forbidden');
      }
      else if(error.status === 404) {
        alert('API Not Found');
      }
      else if(error.status === 500) {
        alert('Internal Server Error');
      }
      else {
        alert('An unexpected error occurred');
      }
      return throwError(() => error);
    })
  );
};
