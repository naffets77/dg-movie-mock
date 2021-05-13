import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'
import { OMDBGetMoviesResponse } from '../models/OMDAPI.interface';

@Injectable({
  providedIn: 'root'
})
export class OMDApiProxyService {

  // Assessment Note: This isn't necessary but typically this stuff would come from an environment variable so it's contents could be configured during a deployment process more easily
  private url: string = environment.urls.omdbAPI;
  private OMDBAPIKey = environment.omdbAPIKey;

  constructor(private httpClient: HttpClient) { }

  getMoviesObs(search: string, retryCount: number = 3): Observable<any> {
    // Assessment Note: Caching layer required depending on usage? For now it only loads on page load so caching isn't necessary

    return this.httpClient.get(`${this.url}/?apikey=${this.OMDBAPIKey}&s=${search}`).pipe(
      retry(retryCount),
      catchError(this.errorHandler)
    );
  }


  private errorHandler(error: HttpErrorResponse): any {
    // log errors back to server here potentially
    console.error(error);
  }

}
