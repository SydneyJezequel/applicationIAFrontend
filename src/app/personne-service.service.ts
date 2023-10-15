import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Personne} from "./model/personne.model";






/******************************* Service qui gère les Personnes *******************************/

@Injectable({
  providedIn: 'root'
})
export class PersonneServiceService {






  /******************************* Urls *******************************/
  private getAll : string = "api/all"
  private idPersonne : string = "api/personne/"
  private addPersonne : string = "api/add_personne/"
  private deletePersonne : string = "api/delete/"






  /******************************* Constructeur *******************************/
  constructor(private http : HttpClient) { }






  /******************************* Méthodes controlleur *******************************/

  /**
   * Méthode qui renvoie la liste de toutes les personnes.
   *
   */
  public getAllPersonne():Observable<Personne[]>
  {
    return this.http.get<Personne[]>(this.getAll);
  }


  /**
   * Méthode qui renvoie une personne en fonction de son Id.
   *
   */
  public findPersonne(no_personne:number):Observable<Personne>
  {
    return this.http.get<Personne>(this.idPersonne+no_personne);
  }


  /**
   * Méthode qui ajoute une personne.
   *
   */
  public addPerson(personne : Personne):void
  {
   console.log(this.addPersonne, personne);
   this.http.post<Personne>(this.addPersonne,personne).subscribe(
     response => {},
       error => {
       console.error('Erreur : ', error);
     });
  }


  /**
   * Méthode qui supprime une personne.
   *
   */
  public delete(no_personne:number):void
  {
    console.log("Suppression : "+this.deletePersonne+no_personne);
    this.http.delete(this.deletePersonne+no_personne).subscribe(
      response => {},
        error => {
      console.error('Erreur : ', error);
    });
  }




}

