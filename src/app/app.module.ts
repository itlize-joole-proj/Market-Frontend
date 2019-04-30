
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ProductComponent } from "./product/product.component";
import { SignupComponent } from "./signup/signup.component";
import { ProductDetailComponent } from "./product/product-detail/product-detail.component";
import { ProductCompareComponent } from "./product/product-compare/product-compare.component";

import { ProductHttpService } from "./services/product-http.service";
import { AuthenticationService } from "./services/authentication.service";
import { JwtInterceptor } from './interceptor/jwtInterceptor';
import { ErrorInterceptor } from './interceptor/errorInterceptor';
import { AuthGuard } from './guards/AuthGuard';
import { ProductFilterComponent } from './product/product-filter/product-filter.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SubCateHttpService } from './services/subCate-http.service';
import { ProductListComponent } from './product/product-list/product-list.component';
import { SharedService } from './services/shared.service';


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
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ProductHttpService, AuthenticationService, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
             SubCateHttpService, SharedService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
