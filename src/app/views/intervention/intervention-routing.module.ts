import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterventionComponent } from './intervention.component';

const routes: Routes = [
  {
    path:'',
    component: InterventionComponent,
    data: {
      title:'Intervention'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterventionRoutingModule { }
