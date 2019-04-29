import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { SignupComponent } from './signup/signup.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductCompareComponent } from './product/product-compare/product-compare.component';
import { AppRoutingModule } from './app-routing.module';


import { ProductHttpService } from './services/product-http.service';
import { AuthenticationService } from './services/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProductComponent,
    SignupComponent,
    ProductDetailComponent,
    ProductCompareComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule
  ],
  providers: [ProductHttpService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
