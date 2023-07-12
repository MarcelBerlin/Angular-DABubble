import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  // {path: '', component: },
  // {path: '', component: },
  {
    path: 'dashboard', 
    component: DashboardComponent },
  {
    path: '**',
    component: LoginComponent,
    /* dieser Path muss zwingend am ende des routings stehen */
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
