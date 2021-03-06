import { HttpTokenInterceptorService } from './core/http-token-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './core/user.service';
import { HeaderComponent } from './shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { HandymenListComponent } from './handymen-list/handymen-list.component';
import { ContactComponent } from './contact/contact.component';
import { HowitworksComponent } from './howitworks/howitworks.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CategoriesComponent,
    HandymenListComponent,
    ContactComponent,
    HowitworksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptorService, multi: true },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
