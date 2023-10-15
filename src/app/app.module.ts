import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonneComponent } from './personne/personne.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { DetailComponent } from './detail/detail.component';
import { AddPersonneComponent } from './add-personne/add-personne.component';
import { EditPersonneComponent } from './edit-personne/edit-personne.component';
import {ActivatedRoute} from "@angular/router";
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';








@NgModule({
  declarations: [
    AppComponent,
    PersonneComponent,
    DetailComponent,
    AddPersonneComponent,
    EditPersonneComponent,
    NavbarComponent,
    FooterComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})



export class AppModule { }



