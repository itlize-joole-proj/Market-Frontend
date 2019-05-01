
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ProductComponent } from "./product/product.component";
import { SignupComponent } from "./signup/signup.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ProductDetailComponent } from "./product/product-detail/product-detail.component";
import { ProductCompareComponent } from "./product/product-compare/product-compare.component";

import { ProductHttpService } from "./services/product-http.service";
import { AuthenticationService } from "./services/authentication.service";
import { JwtInterceptor } from './interceptor/jwtInterceptor';
import { ErrorInterceptor } from './interceptor/errorInterceptor';
import { AuthGuard } from './guards/AuthGuard';
import { ProductFilterComponent } from './product/product-filter/product-filter.component';

import { Ng5SliderModule } from 'ng5-slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SubCateHttpService } from './services/subCate-http.service';
import { ProductListComponent } from './product/product-list/product-list.component';
import { SharedService } from './services/shared.service';
import { KeysPipe } from './pipes/keys.pipe';
import { ProductService } from './product/product.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProductComponent,
    SignupComponent,
    ProductDetailComponent,
    ProductCompareComponent,
    ProductFilterComponent,
    ProductListComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    Ng5SliderModule,
    FormsModule
  ],
  providers: [ProductHttpService, AuthenticationService, AuthGuard, NgModule,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
             SubCateHttpService, SharedService,KeysPipe, ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
