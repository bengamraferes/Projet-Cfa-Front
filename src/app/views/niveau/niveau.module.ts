import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NiveauRoutingModule } from './niveau-routing.module';
import { NiveauComponent } from './niveau.component';
import { AvatarModule, ButtonGroupModule, ButtonModule, CardModule, CollapseModule, FormModule, GridModule, NavModule, PaginationModule, ProgressModule, TableModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetsModule } from '../widgets/widgets.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ColorPickerModule } from 'ngx-color-picker';


@NgModule({
  declarations: [
    NiveauComponent
  ],
  imports: [
    ColorPickerModule,
    CommonModule,
    NiveauRoutingModule,
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
  ]
})
export class NiveauModule { }
