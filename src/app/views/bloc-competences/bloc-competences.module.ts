import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocCompetencesRoutingModule } from './bloc-competences-routing.module';
import { BlocCompetencesComponent } from './bloc-competences.component';


@NgModule({
  declarations: [
    BlocCompetencesComponent
  ],
  imports: [
    CommonModule,
    BlocCompetencesRoutingModule
  ]
})
export class BlocCompetencesModule { }
