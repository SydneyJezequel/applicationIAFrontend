import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { PersonModule } from "./_modules/person/person.module";
import { CityModule } from "./_modules/city/city.module";
import { IAModule } from "./_modules/ia/ia.module";






/******************************* Module App *******************************/
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PersonModule,
    CityModule,
    IAModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

