import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { UserListComponent } from './components/user-list/user-list.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },

  { path: 'login', component: LoginComponent },

  {
    path: 'home', component: HomeComponent,

    children: [
      {
        path: '', redirectTo: 'userList', pathMatch: 'full'
      },

      { path: 'admin', component: AdminComponent },
      { path: 'purchase', component: PurchaseComponent },
      { path: 'userList', component: UserListComponent }



    ]

  },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
