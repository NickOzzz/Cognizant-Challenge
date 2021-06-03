import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { MainComponent } from './main/main.component';
import { CookieService } from "ngx-cookie-service";
import { CartComponent } from './cart/cart.component';
import { SortdatePipe } from './sortdate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CartComponent,
    SortdatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
