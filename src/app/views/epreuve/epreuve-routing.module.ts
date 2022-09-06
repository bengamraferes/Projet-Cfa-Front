import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpreuveComponent } from './epreuve.component';

const routes: Routes = [
  {
  path:'',
  component: EpreuveComponent,
  data: {
    title:'Epreuve'
  }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EpreuveRoutingModule { }
