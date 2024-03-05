import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from "./list-persons/person.component";
import { DetailComponent } from "./detail/detail.component";
import { AddPersonComponent } from "./add-person/add-person.component";
import { EditPersonComponent } from "./edit-person/edit-person.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AddManyPersonsComponent } from "./add-many-persons/add-many-persons.component";






/******************************* Module Personne *******************************/
@NgModule({
  declarations: [
    PersonComponent,
    DetailComponent,
    AddPersonComponent,
    EditPersonComponent,
    AddManyPersonsComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class PersonModule { }

