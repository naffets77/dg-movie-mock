import { Injectable } from '@angular/core';
import { OMDApiProxyService } from './omdapi-proxy.service';
import { OMDBGetMoviesResponse, OMDBMovieDetails, OMDBMovie } from '../models/OMDAPI.interface';
import { Observable, forkJoin } from 'rxjs';
import { GetMoviesResponse } from '../models/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private OMDApiProxyService: OMDApiProxyService) { }


  /*
      Assessment Note:

      Regarding setting the decades...

      I'd prefer not to have a nested for loop in general, however it's on the client and a small subset of data. The time to do the
      async calls are a magnitude greater than setting this data, so I think it's fine w/out sacrificing releatvie performance. If I
      did think that this was taking a long time (maybe for a larger data set... i.e. if the minimum wasn't 10 but like 100 per page)
      I could implement a cache with an object to lookup the id's immediatley w/out having to loop.
  */



  public getMovies(movieName: string): Observable<GetMoviesResponse> {

    return new Observable((observer) => {
      this.OMDApiProxyService.getMovies(movieName).subscribe((result: OMDBGetMoviesResponse) => {

        // no results return immediatley
        if (parseInt(result.totalResults, 0) === 0) {
          observer.next({
            OMDBGetMoviesResponse: result,
          });
        }

        // results found - need to get details

        const obs$: Observable<any>[] = [];

        result.Search.forEach((movie: OMDBMovie) => {
          obs$.push(this.OMDApiProxyService.getMovieDetails(movie.imdbID));
        });

        forkJoin(obs$).subscribe((detailResults: OMDBMovieDetails[]) => {

          // can't trust the order here because they're async so we'll just search and set the data by imdb id
          detailResults.forEach((detailResult: OMDBMovieDetails) => {
            const movie = result.Search.find(m => m.imdbID === detailResult.imdbID)
            if (movie) {
              movie.Details = detailResult;
            }
          });

          const decades = this.setupDecades(result);

          observer.next({
            OMDBGetMoviesResponse: result,
            decades
          });

          observer.complete();

        });


      });
    });


  }


  private setupDecades(response: OMDBGetMoviesResponse): number[] {

    const decadesForFilter: number[] = [];

    response.Search.forEach((result: OMDBMovie) => {

      const decade = Math.floor(parseInt(result.Year) / 10) * 10;
      result._meta = {
        decade: decade
      };

      if (decadesForFilter.includes(decade)) {
        return;
      }

      decadesForFilter.push(decade);
    });

    decadesForFilter.sort();
    return decadesForFilter;
  }
}
