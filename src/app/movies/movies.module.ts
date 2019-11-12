import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MoviesPage } from './movies.page';
import { ModalMoviePageModule } from '../modal-movie/modal-movie.module';

const routes: Routes = [
  {
    path: '',
    component: MoviesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalMoviePageModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MoviesPage
  ],
  declarations: [MoviesPage]
})
export class MoviesPageModule { }
