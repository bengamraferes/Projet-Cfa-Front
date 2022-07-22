import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VilleComponent } from './ville.component';

const routes: Routes = [
 { path: '',
  component: VilleComponent,
  data: {
    title: "ville"
  }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VilleRoutingModule { }
