import { NgModule } from '@angular/core';
import { CityComponent } from "./list-city/city.component";
import { DetailCityComponent } from "./detail-city/detail-city.component";
import { AddCityComponent } from "./add-city/add-city.component";
import { EditCityComponent } from "./edit-city/edit-city.component";
import { Routes, RouterModule } from "@angular/router";






/******************************* Routes *******************************/
const routes: Routes = [
  { path: 'cities', component: CityComponent },
  { path: 'cities/details/:no_city', component: DetailCityComponent },
  { path: 'cities/add', component: AddCityComponent },
  { path: 'cities/edit/:no_city', component: EditCityComponent },
];






/******************************* Module de Routage *******************************/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }

