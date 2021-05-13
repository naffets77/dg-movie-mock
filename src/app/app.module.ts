import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OMDApiProxyService } from './services/omdapi-proxy.service';
import { MovieViewerPageComponent } from './pages/movie-viewer-page/movie-viewer-page.component';
import { MovieViewerPageModule } from './pages/movie-viewer-page/movie-viewer-page.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MovieViewerPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
