import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { City } from "../../../model/city.model";
import { CityService } from "../../../_services/city.service";






/******************************* Controller d'Ajout d'une Ville *******************************/
@Component({
  selector: 'app-add-list-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})
export class AddCityComponent implements OnInit {





  /******************************* Attributs *******************************/

  public addCity: City = new City();





  /******************************* Constructeur *******************************/
  constructor(private cityService : CityService, private router: Router) { }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {

  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui ajoute une ville.
   *
   */
  public onAddCity(): void {
    console.log(this.addCity);
    this.cityService.createCity(this.addCity);
    // Redirection :
    this.router.navigate(['cities']);
  }






}

