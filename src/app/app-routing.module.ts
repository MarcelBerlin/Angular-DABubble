import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateAccountComponent } from './create-account/create-account.component';


const routes: Routes = [
  // {path: '', component: },
  // {path: '', component: },
  {
    path: 'forgot_password',
    component: ForgotPasswordComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'createAccount',
    component: CreateAccountComponent
  },
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
export class AppRoutingModule {

  
 }
