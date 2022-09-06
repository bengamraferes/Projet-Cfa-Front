import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrmotionDetailRoutingModule } from './prmotion-detail-routing.module';
import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  FormModule,
  GridModule,
  ModalModule,
  NavModule,
  PaginationModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { WidgetsModule } from '../widgets/widgets.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { YesNoModule } from '../../utils/yes-no/yes-no.module';
import { PrmotionDetailComponent } from './prmotion-detail.component';
@NgModule({
  declarations: [PrmotionDetailComponent],
  imports: [
    PrmotionDetailRoutingModule,
    CommonModule,
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
    WidgetsModule,
    CollapseModule,
    PaginationModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    FontAwesomeModule,
    ModalModule,
    YesNoModule,
  ]
})
export class PrmotionDetailModule { }
