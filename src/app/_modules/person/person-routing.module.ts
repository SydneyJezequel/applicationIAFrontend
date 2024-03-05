import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { EditPersonComponent } from "./edit-person/edit-person.component";
import { DetailComponent } from "./detail/detail.component";
import { PersonComponent } from "./list-persons/person.component";
import { AddPersonComponent } from "./add-person/add-person.component";
import { AddManyPersonsComponent } from "./add-many-persons/add-many-persons.component";






/******************************* Routes *******************************/
const routes: Routes = [
  { path: '', redirectTo: 'persons', pathMatch: 'full' },
  { path: 'persons', component: PersonComponent },
  { path: 'details/:no_person', component: DetailComponent },
  { path: 'add', component: AddPersonComponent },
  { path: 'edit/:no_person', component: EditPersonComponent },
  { path: 'add/many-persons', component: AddManyPersonsComponent },
];






/******************************* Module de Routage *******************************/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }

