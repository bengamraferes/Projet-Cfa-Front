import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UtilisateurComponent} from './utilisateur.component'

const routes: Routes = [
  {
    path: '',
    component: UtilisateurComponent,
    data: {
      title: "Utilisateur"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UtilisateurRoutingModule {
}
