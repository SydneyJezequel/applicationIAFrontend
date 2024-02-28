import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Personne } from "../model/personne.model";






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
  private addExcelPersonnes : string = 'api/personne/import/excel/';
  private addCsvPersonnes : string = 'api/personne/import/csv/';
  private generateExcelFile : string = "api/personne/generateExcel";
  private generateCsvFile : string = "/api/personne/generateCsv";
  private getPhoto = 'api/personne/image-base64';





  /******************************* Constructeur *******************************/
  constructor(private http : HttpClient) { }





  /******************************* Méthodes *******************************/

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
  public async addPerson(personne: Personne, photoBase64String: string): Promise<void> {
    try {
      const response = await this.http.post<Object>(this.addPersonne, { personne, photoBase64String }).toPromise();
      console.log(response);
    } catch (error) {
      console.error('Erreur : ', error);
    }
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



  /**
   * Méthode qui intègre un fichier Excel contenant une liste de personnes
   *
   */
  public uploadExcelFile(file: File) {
    const formData: FormData = new FormData(); // Création d'un objet FormData. Il est utilisé pour envoyer des données de formulaire (ex : fichiers) via une requête HTTP POST.
    formData.append('file', file, file.name); // Ajout du fichier à l'objet FormData.
    return this.http.post<boolean>(this.addExcelPersonnes, formData); // Envoi du formData vers le Back.
  }



  /**
   * Méthode qui génère un fichier Excel contenant les personnes stockées en BDD.
   *
   */
  public generateExcel() {
    return this.http.get<boolean>(this.generateExcelFile);
  }



  /**
   * Méthode qui intègre un fichier Csv contenant une liste de personnes.
   *
   */
  public uploadCsvFile(file: File) {
    const formData: FormData = new FormData(); // Création d'un objet FormData. Il est utilisé pour envoyer des données de formulaire (ex : fichiers) via une requête HTTP POST.
    formData.append('file', file, file.name); // Ajout du fichier à l'objet FormData.
    return this.http.post<boolean>(this.addCsvPersonnes, formData); // Envoi du formData vers le Back.
  }



  /**
   * Méthode qui génère un fichier Excel contenant les personnes stockées en BDD.
   *
   */
  public generateCsv() {
    return this.http.get<boolean>(this.generateCsvFile);
  }



  // *************************** TEST RECUPERER UNE IMAGE *************************** //
  /**
   * Méthode qui récupère une photo stocké en BDD.
   *
   */
  public getPicture(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get<string>(this.getPhoto).subscribe(
          (response: string) => {
            console.log("Réponse du service : " + response);
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  // *************************** TEST RECUPERER UNE IMAGE *************************** //






}

