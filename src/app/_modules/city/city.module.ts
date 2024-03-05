import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityRoutingModule } from './city-routing.module';
import { CityComponent } from "./list-city/city.component";
import { DetailCityComponent } from "./detail-city/detail-city.component";
import { AddCityComponent } from "./add-city/add-city.component";
import { EditCityComponent } from "./edit-city/edit-city.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";






/******************************* Module Ville *******************************/
@NgModule({
  declarations: [
    CityComponent,
    DetailCityComponent,
    AddCityComponent,
    EditCityComponent
  ],
  imports: [
    CommonModule,
    CityRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class CityModule { }

