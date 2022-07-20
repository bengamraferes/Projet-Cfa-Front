import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlocCompetences } from '../../_models/blocCompetences';
import {BlocCompetencesComponent} from './bloc-competences.component'

const routes: Routes = [
  {
    path:'',
    component : BlocCompetencesComponent,
    data: {
      title:'Bloc Competences'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlocCompetencesRoutingModule { }
