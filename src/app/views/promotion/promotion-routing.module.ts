import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromotionComponent} from'./promotion.component'

const routes: Routes = [
  { path: '',
  component: PromotionComponent,
  data: {
    title: "Promotion"
  }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionRoutingModule { }
