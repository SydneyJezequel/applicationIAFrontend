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

  private loadApiVille : string = "api/ville/load-api";
  private getAll : string = "api/ville/all";
  private idVille: string = "api/ville/";
  private newVille : string = "api/ville/add-ville/";
  private deleteVille : string = "api/ville/delete/";





  /******************************* Constructeur *******************************/
  constructor(private http : HttpClient) { }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui charge les villes en BDD depuis une Api.
   * @return Ville[] : Liste des villes.
   *
   */
  public loadApi(): Observable<Ville[]> {
    return this.http.get<Ville[]>(this.loadApiVille);
  }



  /**
   * Méthode qui récupère la liste de toutes les villes.
   * @return Ville[] : Liste des villes.
   *
   */
  public getAllVille():Observable<Ville[]>
  {
    console.log(this.http.get<Ville[]>(this.getAll));
    return this.http.get<Ville[]>(this.getAll);
  }



  /**
   * Méthode qui récupère une ville.
   * @param no_ville : id de la ville récupérée.
   * @return Ville : ville récupérée.
   *
   */
  public findVille(no_ville:number):Observable<Ville>
  {
    return this.http.get<Ville>(this.idVille+no_ville);
  }



  /**
   * Méthode qui ajoute une ville.
   * @param ville : ville ajoutée.
   *
   */
  public async addVille(ville: Ville): Promise<void> {
    try {
      const response = await this.http.post<Ville>(this.newVille, ville).toPromise();
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
  public delete(no_ville:number):void
  {
    console.log("Suppression : "+this.deleteVille+no_ville);
    this.http.delete(this.deleteVille+no_ville).subscribe(
      response => {},
      error => {
        console.error('Erreur : ', error);
      });
  }






}

