import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { UtilisateurRoutingModule } from './utilisateur-routing.module'
import { WidgetsModule } from '../widgets/widgets.module';
import { UtilisateurComponent } from './utilisateur.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { YesNoPipe } from 'src/app/utils/yes-no.pipe';

@NgModule({
  imports: [
    UtilisateurRoutingModule,
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
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [UtilisateurComponent,YesNoPipe]
})
export class UtilisateurModule {
}
