import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TitreProfessionnelComponent} from'./titre-professionnel.component'

const routes: Routes = [
  {
    path:'',
    component: TitreProfessionnelComponent,
    data: {
      title:'titreProfessionnel'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TitreProfessionnelRoutingModule { }
