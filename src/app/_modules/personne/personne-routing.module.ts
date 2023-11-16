import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { EditPersonneComponent } from "./edit-personne/edit-personne.component";
import { DetailComponent } from "./detail/detail.component";
import { PersonneComponent } from "./list-personne/personne.component";
import { AddPersonneComponent } from "./add-personne/add-personne.component";
import { AddManyPersonnesComponent } from "./add-many-personnes/add-many-personnes.component";




/******************************* Routes *******************************/
const routes: Routes = [
  { path: '', redirectTo: 'personnes', pathMatch: 'full' },
  { path: 'personnes', component: PersonneComponent },
  { path: 'details/:no_personne', component: DetailComponent },
  { path: 'add', component: AddPersonneComponent },
  { path: 'edit/:no_personne', component: EditPersonneComponent },
  { path: 'add/many-personnes', component: AddManyPersonnesComponent },
];




/******************************* Module de Routage *******************************/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PersonneRoutingModule { }

