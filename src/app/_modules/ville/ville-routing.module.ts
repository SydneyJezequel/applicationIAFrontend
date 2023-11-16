import { NgModule } from '@angular/core';
import { VilleComponent } from "./list-ville/ville.component";
import { DetailVilleComponent } from "./detail-ville/detail-ville.component";
import { AddVilleComponent } from "./add-ville/add-ville.component";
import { EditVilleComponent } from "./edit-ville/edit-ville.component";
import { Routes, RouterModule } from "@angular/router";




/******************************* Routes *******************************/
const routes: Routes = [
  { path: 'villes', component: VilleComponent },
  { path: 'villes/details/:no_ville', component: DetailVilleComponent },
  { path: 'villes/add', component: AddVilleComponent },
  { path: 'villes/edit/:no_ville', component: EditVilleComponent },
];




/******************************* Module de Routage *******************************/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class VilleRoutingModule { }

