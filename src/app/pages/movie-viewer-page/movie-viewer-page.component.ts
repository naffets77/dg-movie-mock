import { Component, OnInit } from '@angular/core';
import { OMDApiProxyService } from 'src/app/services/omdapi-proxy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OMDBGetMoviesResponse, } from 'src/app/models/OMDAPI.interface';

import { MovieService } from 'src/app/services/movie.service';
import { GetMoviesResponse } from 'src/app/models/movie.interface';

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
  public decadesForFilter: number[];
  public activeDecade: number = null;

  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService, private OMDApiProxyService: OMDApiProxyService) {

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(result => {
      this.loading = true;
      this.movieSearchResult = null;
      this.totalResults = null;
      this.decadesForFilter = [];
      this.initializeForm(result.get('search') || '');
      this.search();
    });

  }

  public submitForm() {
    if (this.form.invalid || this.form.controls['search'].value === this.route.snapshot.params['search']) {
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

    this.movieService.getMovies(this.form.controls['search'].value).subscribe((result: GetMoviesResponse) => {

      this.totalResults = parseInt(result.OMDBGetMoviesResponse.totalResults, 10);

      if (this.totalResults > 0) {
        this.movieSearchResult = result.OMDBGetMoviesResponse;
        this.decadesForFilter = result.decades;
        this.activeDecade = this.decadesForFilter[this.decadesForFilter.length - 1]; // default to recent
      }

      this.form.controls['search'].enable();
      this.loading = false;

    });
  }

}
