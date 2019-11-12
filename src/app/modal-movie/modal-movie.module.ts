import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModalMoviePage } from './modal-movie.page';

@NgModule({
  declarations: [
    ModalMoviePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  entryComponents: [
    ModalMoviePage
  ]
})
export class ModalMoviePageModule { }
