import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionRoutingModule } from './promotion-routing.module';
import { AvatarModule, ButtonGroupModule, ButtonModule, CardModule, CollapseModule, FormModule, GridModule, ModalModule, NavModule, PaginationModule, ProgressModule, TableModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetsModule } from '../widgets/widgets.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PromotionComponent } from './promotion.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [PromotionComponent],
  imports: [
    CommonModule,
    PromotionRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    AvatarModule,
    TableModule,
    WidgetsModule,
    CollapseModule,
    PaginationModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class PromotionModule { }
