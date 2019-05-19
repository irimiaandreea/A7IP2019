import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

// Import ionic-rating module
import { IonicRatingModule } from 'ionic4-rating';

import { MypackagesPage } from './mypackages.page';

const routes: Routes = [
  {
    path: '',
    component: MypackagesPage
  }
];


@NgModule({
  imports: [
    CommonModule,
    IonicRatingModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MypackagesPage]
})
export class MypackagesPageModule {}
