import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InterventionDetailComponent} from './intervention-detail.component'

const routes: Routes = [
  {
    path:'',
    component : InterventionDetailComponent,
    data: {
      title:'Intervention-Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterventionDetailRoutingModule { }
