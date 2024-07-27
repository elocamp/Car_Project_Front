import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/auth-components/login/login.component';
import { SignupComponent } from './auth/auth-components/signup/signup.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: SignupComponent},
  {path: "admin", loadChildren: () => import("./modules/admin/admin.module").then(e => e.AdminModule)},
  {path: "costumer", loadChildren: () => import("./modules/costumer/costumer.module").then(e => e.CostumerModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
