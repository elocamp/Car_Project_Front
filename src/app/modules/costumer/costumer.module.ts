import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostumerRoutingModule } from './costumer-routing.module';
import { CostumerDashboardComponent } from './components/costumer-dashboard/costumer-dashboard.component';


@NgModule({
  declarations: [
    CostumerDashboardComponent
  ],
  imports: [
    CommonModule,
    CostumerRoutingModule
  ]
})
export class CostumerModule { }
