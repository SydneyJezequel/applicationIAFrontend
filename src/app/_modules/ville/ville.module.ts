import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VilleRoutingModule } from './ville-routing.module';
import { VilleComponent } from "./list-ville/ville.component";
import { DetailVilleComponent } from "./detail-ville/detail-ville.component";
import { AddVilleComponent } from "./add-ville/add-ville.component";
import { EditVilleComponent } from "./edit-ville/edit-ville.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";




/******************************* Module Ville *******************************/
@NgModule({
  declarations: [
    VilleComponent,
    DetailVilleComponent,
    AddVilleComponent,
    EditVilleComponent
  ],
  imports: [
    CommonModule,
    VilleRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class VilleModule { }

