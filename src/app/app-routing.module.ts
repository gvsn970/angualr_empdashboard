import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AllEmployessListComponent } from './component/all-employess-list/all-employess-list.component';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { RegisterComponent } from './component/register/register.component';
import { UpdateComponent } from './component/update/update.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
const routes: Routes = [
  {path:"", component:RegisterComponent,pathMatch:'full'},
  {path:"register", component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"welcome",component:WelcomeComponent},
  {path:"allemp",component:AllEmployessListComponent},
  {path:'updateemp/:id',component:UpdateComponent},
  { path: '**', component: PageNotFoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
