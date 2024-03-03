import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Ville } from "../model/ville.model";






/******************************* Service qui gère les Villes *******************************/
@Injectable({
  providedIn: 'root'
})
export class VilleService {





  /******************************* Urls *******************************/

  private loadApiVilleUrl : string = "api/ville/load-api";
  private getAllVillesUrl : string = "api/ville/all";
  private idVilleUrl: string = "api/ville/";
  private createVilleUrl : string = "api/ville/add-ville/";
  private deleteVilleUrl : string = "api/ville/delete/";





  /******************************* Constructeur *******************************/
  constructor(private http : HttpClient) { }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui charge les villes en BDD depuis une Api.
   * @return Ville[] : Liste des villes.
   *
   */
  public loadApi(): Observable<Ville[]> {
    return this.http.get<Ville[]>(this.loadApiVilleUrl);
  }



  /**
   * Méthode qui récupère la liste de toutes les villes.
   * @return Ville[] : Liste des villes.
   *
   */
  public getAllVilles(): Observable<Ville[]> {
    console.log(this.http.get<Ville[]>(this.getAllVillesUrl));
    return this.http.get<Ville[]>(this.getAllVillesUrl);
  }



  /**
   * Méthode qui récupère une ville.
   * @param no_ville : id de la ville récupérée.
   * @return Ville : ville récupérée.
   *
   */
  public getVilleById(no_ville:number): Observable<Ville> {
    return this.http.get<Ville>(this.idVilleUrl+no_ville);
  }



  /**
   * Méthode qui ajoute une ville.
   * @param ville : ville ajoutée.
   *
   */
  public async createVille(ville: Ville): Promise<void> {
    try {
      const response = await this.http.post<Ville>(this.createVilleUrl, ville).toPromise();
      console.log(response);
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui supprime une ville.
   * @param no_ville : id de la ville supprimée.
   *
   */
  public deleteVille(no_ville:number): void {
    console.log("Suppression : "+this.deleteVilleUrl+no_ville);
    this.http.delete(this.deleteVilleUrl+no_ville).subscribe(
      response => {},
      error => {
        console.error('Erreur : ', error);
      });
  }






}

