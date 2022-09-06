import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpreuveRoutingModule } from './epreuve-routing.module';
import { EpreuveComponent } from './epreuve.component';
import { AvatarModule, ButtonGroupModule, ButtonModule, CardModule, CollapseModule, FormModule, GridModule, NavModule, PaginationModule, ProgressModule, TableModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetsModule } from '../widgets/widgets.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [EpreuveComponent],
  imports: [
    CommonModule,
    EpreuveRoutingModule,
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
  ]
})
export class EpreuveModule { }
