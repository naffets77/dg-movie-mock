import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieViewerPageComponent } from './pages/movie-viewer-page/movie-viewer-page.component';

const routes: Routes = [
  { path: 'movies/:search', component: MovieViewerPageComponent },
  { path: '', redirectTo: '/movies/batman', pathMatch: 'full' }, // redirect to
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
