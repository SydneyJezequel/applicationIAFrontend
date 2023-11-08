import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VilleModule} from "./_modules/ville/ville.module";
import {PersonneModule} from "./_modules/personne/personne.module";
import {ContactComponent} from "./contact/contact.component";




/******************************* Routes *******************************/
const routes: Routes = [
  { path:'contact', component: ContactComponent }
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

