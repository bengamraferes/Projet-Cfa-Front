import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitreProfessionnelRoutingModule } from './titre-professionnel-routing.module';

import {
  AlertModule,
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  FormModule,
  GridModule,
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
import { TitreProfessionnelComponent } from './titre-professionnel.component';

@NgModule({
  declarations: [
    TitreProfessionnelComponent
  ],
  imports: [
    CommonModule,
    TitreProfessionnelRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    PaginationModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
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
    AlertModule,
   
  ]
})
export class TitreProfessionnelModule { }
