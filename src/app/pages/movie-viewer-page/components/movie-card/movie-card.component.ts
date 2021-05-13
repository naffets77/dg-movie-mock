import { Component, OnInit, Input } from '@angular/core';
import { OMDBMovie } from 'src/app/models/OMDAPI.interface';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() OMDBMovie: OMDBMovie;

  constructor() { }

  ngOnInit(): void {
  }

}
