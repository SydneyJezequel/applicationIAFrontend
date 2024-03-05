import { Component, OnInit } from '@angular/core';
import { CityService } from "../../../_services/city.service";
import { City } from "../../../model/city.model";
import { HttpErrorResponse } from "@angular/common/http";






/******************************* Controller qui liste les Villes *******************************/
@Component({
  selector: 'app-list-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {





  /******************************* Attributs *******************************/

  public cities !: City[];
  public city !: City;





  /******************************* Constructeur *******************************/
  constructor(private cityService : CityService) {
    this.cityService = cityService;
  }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
    this.getAllCities();
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui charge les villes en BDD depuis une Api.
   *
   */
  public loadApi(): void {
    this.cityService.loadApi().subscribe(
      (response: City[]) =>
      {
        this.cities = response;
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
     // Re-chargement de la fenêtre :
     window.location.reload();
  }



  /**
   * Méthode qui récupère la liste de toutes les villes.
   *
   */
  public getAllCities(): void {
    this.cityService.getAllCities().subscribe(
    (response: City[]) =>
    {
      this.cities = response;
      // ***************** TEST ***************** //
      console.log("AFFICHAGE GET ALL : ");
      for(let a = 0; a<this.cities.length; a++){
        console.log("AFFICHAGE ELEMENT : " + a);
        console.log(this.cities[a].no_city);
        console.log(this.cities[a].postal_codes);
        console.log(this.cities[a].name);
        console.log(this.cities[a].region_code);
        console.log(this.cities[a].department_code);
        console.log(this.cities[a].population);
        console.log(this.cities[a].siren);
      }
      // ***************** TEST ***************** //
    }),
    (error:HttpErrorResponse) =>
    {
      alert(error.message);
    }
  }



  /**
   * Méthode qui renvoie une city en fonction de son Id.
   * @param no_city : id de la city récupérée.
   *
   */
  public getCityById(no_city:number): void {
    this.cityService.getCityById(no_city).subscribe(
    (response: City) =>
    {
      this.city = response;
    }),
    (error:HttpErrorResponse) =>
    {
      alert(error.message);
    }
  }



  /**
   * Méthode qui ajoute une ville.
   * @param city : ville ajoutée.
   *
   */
  public async createCity(city:City): Promise<void> {
    return this.cityService.createCity(city);
  }



  /**
   * Méthode qui supprime une ville.
   * @param no_city : id de la ville supprimée.
   *
   */
  public deleteCity(no_city:number): void {
    this.cityService.deleteCity(no_city);
    // Re-chargement de la fenêtre :
    window.location.reload();
  }






}

