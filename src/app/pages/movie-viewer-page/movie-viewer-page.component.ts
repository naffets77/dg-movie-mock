import { Component, OnInit } from '@angular/core';
import { OMDApiProxyService } from 'src/app/services/omdapi-proxy.service';
import { ActivatedRoute, RouteConfigLoadEnd, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OMDBMovie, OMDBGetMoviesResponse, OMDBMovieDetails } from 'src/app/models/OMDAPI.interface';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-movie-viewer-page',
  templateUrl: './movie-viewer-page.component.html',
  styleUrls: ['./movie-viewer-page.component.scss']
})
export class MovieViewerPageComponent implements OnInit {

  public loading: boolean = true;
  public form: FormGroup;
  public movieSearchResult: OMDBGetMoviesResponse;
  public totalResults: number;
  public yearsForFilter: number[];
  public activeYear: number = null;

  constructor(private route: ActivatedRoute, private router: Router, private OMDApiProxyService: OMDApiProxyService) {

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(result => {
      this.loading = true;
      this.movieSearchResult = null;
      this.totalResults = null;
      this.yearsForFilter = [];
      this.initializeForm(result.get('search') || '');
      this.search();
    });

  }

  public submitForm() {
    if (this.form.invalid) {
      return;
    }
    this.form.controls['search'].disable();

    this.router.navigate([`/movies/${this.form.controls['search'].value}`])
  }

  private initializeForm(search: string = '') {
    this.form = new FormGroup({
      search: new FormControl({ value: search, disabled: true }, Validators.required)
    })
  }


  private search() {

    if (this.form.invalid) {
      return;
    }

    this.OMDApiProxyService.getMovies(this.form.controls['search'].value).subscribe((result: OMDBGetMoviesResponse) => {

      const totalResults = parseInt(result.totalResults, 0);

      if (totalResults === 0) {
        this.movieSearchResult = result;
        this.loading = false;
        this.form.controls['search'].enable();
        return;
      }

      const obs$: Observable<any>[] = [];

      result.Search.forEach((movie: OMDBMovie) => {
        obs$.push(this.OMDApiProxyService.getMovieDetails(movie.imdbID));
      });

      forkJoin(obs$).subscribe((detailResults: OMDBMovieDetails[]) => {


        /*
           Assessment Note:

           I'd prefer not to have a nested for loop in general, however it's on the client and a small subset of data. The time to do the
           async calls are a magnitude greater than setting this data, so I think it's fine w/out sacrificing releatvie performance. If I
           did think that this was taking a long time (maybe for a larger data set... i.e. if the minimum wasn't 10 but like 100 per page)
           I could implement a cache with an object to lookup the id's immediatley w/out having to loop.

        */

        // can't trust the order here because they're async so we'll just search and set the data by imdb id
        detailResults.forEach((detailResult: OMDBMovieDetails) => {
          const movie = result.Search.find(m => m.imdbID === detailResult.imdbID)
          if (movie) {
            movie.Details = detailResult;
          }
        });



        this.totalResults = totalResults;
        this.movieSearchResult = result;

        this.setupDecades();
        this.activeYear = this.yearsForFilter[0];

        this.loading = false;
        this.form.controls['search'].enable();

        console.log(this.movieSearchResult);

      })

    })
  }

  private setupDecades() {
    this.movieSearchResult.Search.forEach((result: OMDBMovie) => {

      const decade = Math.floor(parseInt(result.Year) / 10) * 10;
      result._meta = {
        decade: decade
      };

      if (this.yearsForFilter.includes(decade)) {
        return;
      }

      this.yearsForFilter.push(decade);
    });

    this.yearsForFilter.sort();
  }

}
