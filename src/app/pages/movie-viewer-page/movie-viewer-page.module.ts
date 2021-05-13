import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieViewerPageComponent } from './movie-viewer-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OMDApiProxyService } from 'src/app/services/omdapi-proxy.service';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [MovieViewerPageComponent, MovieCardComponent],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    PipesModule
  ],
  providers: [OMDApiProxyService]
})
export class MovieViewerPageModule { }
