import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VilleModule} from "./_modules/ville/ville.module";
import {PersonneModule} from "./_modules/personne/personne.module";









/******************************* Routes *******************************/
const routes: Routes = [
  // Vos routes principales ici si nécessaire
];









/******************************* Module de Routage *******************************/
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    VilleModule,
    PersonneModule
  ],
  exports: [RouterModule]
})




export class AppRoutingModule { }

