import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
      },

  { path: 'login', component: LoginComponent },
 
  {
    path: 'dashboard', component: HomeComponent,

    children: [
      {
        path: '', redirectTo: 'notes', pathMatch: 'full'
      },
     



    ]

  },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
