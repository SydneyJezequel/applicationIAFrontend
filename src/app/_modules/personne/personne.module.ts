import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonneRoutingModule } from './personne-routing.module';
import { PersonneComponent } from "./list-personne/personne.component";
import { DetailComponent } from "./detail/detail.component";
import { AddPersonneComponent } from "./add-personne/add-personne.component";
import { EditPersonneComponent } from "./edit-personne/edit-personne.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AddManyPersonnesComponent } from "./add-many-personnes/add-many-personnes.component";






/******************************* Module Personne *******************************/
@NgModule({
  declarations: [
    PersonneComponent,
    DetailComponent,
    AddPersonneComponent,
    EditPersonneComponent,
    AddManyPersonnesComponent
  ],
  imports: [
    CommonModule,
    PersonneRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class PersonneModule { }

