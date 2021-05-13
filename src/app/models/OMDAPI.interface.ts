export interface OMDBGetMoviesResponse {
  Search: OMDBMovie[];
  totalResults: number;
  Response: boolean;
}


export interface OMDBMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
