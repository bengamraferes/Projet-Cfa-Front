import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PrmotionDetailComponent} from './prmotion-detail.component'
const routes: Routes = [
  {
    path:'',
    component : PrmotionDetailComponent,
    data: {
      title:'Promotion-Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrmotionDetailRoutingModule { }
