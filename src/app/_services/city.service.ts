import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { City } from "../model/city.model";






/******************************* Service qui gère les Villes *******************************/
@Injectable({
  providedIn: 'root'
})
export class CityService {





  /******************************* Urls *******************************/

  private loadApiCityUrl : string = "api/city/load-api";
  private getAllCitiesUrl : string = "api/city/all";
  private idCityUrl: string = "api/city/";
  private createCityUrl : string = "api/city/add-city/";
  private deleteCityUrl : string = "api/city/delete/";





  /******************************* Constructeur *******************************/
  constructor(private http : HttpClient) { }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui charge les villes en BDD depuis une Api.
   * @return City[] : Liste des villes.
   *
   */
  public loadApi(): Observable<City[]> {
    return this.http.get<City[]>(this.loadApiCityUrl);
  }



  /**
   * Méthode qui récupère la liste de toutes les villes.
   * @return City[] : Liste des villes.
   *
   */
  public getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(this.getAllCitiesUrl);
  }



  /**
   * Méthode qui récupère une Ville.
   * @param no_city : id de la ville récupérée.
   * @return City : ville récupérée.
   *
   */
  public getCityById(no_city:number): Observable<City> {
    return this.http.get<City>(this.idCityUrl+no_city);
  }



  /**
   * Méthode qui enregistre une ville.
   * @param city : ville enregistrée.
   *
   */
  public async createCity(city: City): Promise<void> {
    try {
      const response = await this.http.post<City>(this.createCityUrl, city).toPromise();
      console.log(response);
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui supprime une ville.
   * @param no_city : id de la ville supprimée.
   *
   */
  public deleteCity(no_city:number): void {
    console.log("Suppression : "+this.deleteCityUrl+no_city);
    this.http.delete(this.deleteCityUrl+no_city).subscribe(
      response => {},
      error => {
        console.error('Erreur : ', error);
      });
  }






}

