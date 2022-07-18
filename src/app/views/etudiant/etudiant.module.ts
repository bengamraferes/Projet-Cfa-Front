import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantRoutingModule } from './etudiant-routing.module';
import {
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
import { EtudiantComponent } from './etudiant.component';


@NgModule({
  declarations: [EtudiantComponent],
  imports: [
    CommonModule,
    EtudiantRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
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
    ReactiveFormsModule
  
  ]
 
})
export class EtudiantModule { }
