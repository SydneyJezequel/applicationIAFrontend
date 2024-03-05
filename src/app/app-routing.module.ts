import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityModule } from "./_modules/city/city.module";
import { PersonModule } from "./_modules/person/person.module";
import { ContactComponent } from "./contact/contact.component";
import { IAModule } from "./_modules/ia/ia.module";






/******************************* Routes *******************************/
const routes: Routes = [
  { path:'contact', component: ContactComponent }
];






/******************************* Module de Routage *******************************/
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CityModule,
    PersonModule,
    IAModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }

