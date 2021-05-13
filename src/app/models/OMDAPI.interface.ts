export interface OMDBGetMoviesResponse {
  Search: OMDBMovie[];
  totalResults: string;
  Response: boolean;
}


export interface OMDBMovie {
  _meta: OMDBMovieMeta;
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Details: OMDBMovieDetails
}

export interface OMDBMovieDetails {
  imdbID: string;
  Poster: string;
  Rated: string;
  Runtime: string;
  Released: string;
  Plot: string;
}


export interface OMDBMovieMeta {
  decade: number;
}
