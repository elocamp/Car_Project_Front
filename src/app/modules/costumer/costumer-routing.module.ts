import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostumerDashboardComponent } from './components/costumer-dashboard/costumer-dashboard.component';

const routes: Routes = [
  {path: "dashboard", component: CostumerDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostumerRoutingModule { }
