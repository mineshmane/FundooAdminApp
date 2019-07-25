import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// MDB Angular Free
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HttpClientModule,} from '@angular/common/http';
// import { PaginationModule } from 'ngx-pagination-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {DataTableModule} from "angular-6-datatable";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    PurchaseComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule, FormsModule,ReactiveFormsModule,NgxPaginationModule,
      HttpClientModule,DataTableModule
  ],
  providers: [ HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
