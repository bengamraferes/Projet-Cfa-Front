import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VilleRoutingModule } from './ville-routing.module';

import { AlertModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, PaginationModule, TableModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { VilleComponent } from './ville.component';
@NgModule({
  declarations: [
    VilleComponent
  ],
  imports: [
    CommonModule,
    VilleRoutingModule,
    GridModule,
    PaginationModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ReactiveFormsModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    TableModule,
    AlertModule,
  ]
})
export class VilleModule { }
