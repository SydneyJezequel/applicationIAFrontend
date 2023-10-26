import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Personne} from "../model/personne.model";






/******************************* Service qui gère les Personnes *******************************/

@Injectable({
  providedIn: 'root'
})
export class PersonneServiceService {






  /******************************* Urls *******************************/
  private getAll : string = "api/personne/all";
  private idPersonne : string = "api/personne/";
  private addPersonne : string = "api/personne/add-personne/";
  private deletePersonne : string = "api/personne/delete/";
  private addPersonnes : string = 'api/personne/import/excel/';






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
   * Méthode qui renvoie une list-personne en fonction de son Id.
   *
   */
  public findPersonne(no_personne:number):Observable<Personne>
  {
    return this.http.get<Personne>(this.idPersonne+no_personne);
  }



  /**
   * Méthode qui ajoute une list-personne.
   *
   */
  public async addPerson(personne: Personne): Promise<void> {
    try {
      console.log("objet envoyé : "+personne.photo);
      console.log("Type de l'attribut : "+ typeof personne.photo);
      const response = await this.http.post<Personne>(this.addPersonne, personne).toPromise();
      console.log(response);
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui supprime une list-personne.
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



  /**
   * Méthode qui intègre un fichier Excel contenant plusieurs personnes
   *
   */
  public uploadFile(file: File) {
    const formData: FormData = new FormData(); // Création d'un objet FormData. Il est utilisé pour envoyer des données de formulaire (ex : fichiers) via une requête HTTP POST.
    formData.append('file', file, file.name); // Ajout du fichier à l'objet FormData.
    return this.http.post<any[]>(this.addPersonnes, formData); // Envoie du formData vers le Back.
  }











  // *************************** TEST *************************** //
  // *************************** TEST *************************** //
  // *************************** TEST *************************** //
  // *************************** TEST *************************** //


  /**
   * Méthode qui intègre une photo en Base64.
   *
   */
  private baseUrl = 'api/personne/upload';

  public uploadBase64(base64String: string | null): Observable<any> {
    return this.http.post<any>(this.baseUrl, { base64String });
  }


  // *************************** TEST *************************** //
  // *************************** TEST *************************** //
  // *************************** TEST *************************** //
  // *************************** TEST *************************** //












}

