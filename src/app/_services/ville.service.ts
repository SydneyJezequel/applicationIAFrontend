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




/******************************* Méthodes controlleur *******************************/

  /**
   * Méthode qui charge les villes en BDD depuis une Api.
   *
   */
  public loadApi(): Observable<Ville[]> {
    return this.http.get<Ville[]>(this.loadApiVille);
  }



  /**
   * Méthode qui renvoie toutes les villes.
   *
   */
  public getAllVille():Observable<Ville[]>
  {
    console.log(this.http.get<Ville[]>(this.getAll));
    return this.http.get<Ville[]>(this.getAll);
  }



  /**
   * Méthode qui renvoie une ville en fonction de son Id.
   *
   */
  public findVille(no_ville:number):Observable<Ville>
  {
    return this.http.get<Ville>(this.idVille+no_ville);
  }



  /**
   * Méthode qui ajoute une ville.
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

