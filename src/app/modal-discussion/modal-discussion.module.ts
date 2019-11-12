import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalDiscussionPage } from './modal-discussion.page';

@NgModule({
  declarations: [
    ModalDiscussionPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  entryComponents: [
    ModalDiscussionPage
  ]
})
export class ModalDiscussionPageModule { }
