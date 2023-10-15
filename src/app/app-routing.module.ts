import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PersonneComponent} from "./personne/personne.component";
import {DetailComponent} from "./detail/detail.component";
import {AddPersonneComponent} from "./add-personne/add-personne.component";
import {EditPersonneComponent} from "./edit-personne/edit-personne.component";
import {ContactComponent} from "./contact/contact.component";








/******************************* Routes *******************************/
const routes: Routes = [
  { path:'personnes', component: PersonneComponent },
  { path:'details/:no_personne', component: DetailComponent },
  { path:'add', component: AddPersonneComponent },
  { path:'edit/:no_personne', component: EditPersonneComponent },
  { path:'contact', component: ContactComponent },
  { path: '', redirectTo: 'personnes', pathMatch: 'full' }
];








/******************************* Module de Routage *******************************/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})




export class AppRoutingModule { }

