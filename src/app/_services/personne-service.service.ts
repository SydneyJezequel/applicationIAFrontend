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

  private getAllUrl : string = "api/personne/all";
  private idPersonneUrl : string = "api/personne/";
  private addPersonneUrl : string = "api/personne/add-personne/";
  private deletePersonneUrl : string = "api/personne/delete/";
  private addExcelPersonnesUrl : string = 'api/personne/import/excel/';
  private addCsvPersonnesUrl : string = 'api/personne/import/csv/';
  private generateExcelFileUrl : string = "api/personne/generateExcel";
  private generateCsvFileUrl : string = "/api/personne/generateCsv";
  private getPhotoUrl : string = 'api/personne/image-base64';





  /******************************* Constructeur *******************************/
  constructor(private http : HttpClient) { }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui récupère la liste de toutes les personnes.
   * @return Personne[] : Liste de toutes les personnes.
   *
   */
  public getAllPersonnes():Observable<Personne[]>
  {
    return this.http.get<Personne[]>(this.getAllUrl);
  }



  /**
   * Méthode qui récupère une personne.
   * @param no_personne : id de la personne récupérée.
   * @return Personne : Personne récupérée.
   *
   */
  public getPersonneById(no_personne:number):Observable<Personne>
  {
    return this.http.get<Personne>(this.idPersonneUrl+no_personne);
  }



  /**
   * Méthode qui ajoute une personne.
   * @param personne : personne ajoutée.
   * @param photoBase64String : photo de la personne.
   *
   */
  public async createPersonne(personne: Personne, photoBase64String: string): Promise<void> {
    try {
      const response = await this.http.post<Object>(this.addPersonneUrl, { personne, photoBase64String }).toPromise();
      console.log(response);
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui supprime une personne.
   * @param no_personne : id de la personne supprimée.
   *
   */
  public deletePersonne(no_personne:number):void
  {
    console.log("Suppression : "+this.deletePersonneUrl+no_personne);
    this.http.delete(this.deletePersonneUrl+no_personne).subscribe(
      response => {},
        error => {
      console.error('Erreur : ', error);
    });
  }



  /**
   * Méthode qui charge un fichier Excel contenant une liste de personnes.
   * @param file: fichier Excel qui contient la liste des personnes.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public importExcelFile(file: File) {
    // Création d'un objet FormData. Il est utilisé pour envoyer des données de formulaire (ex : fichiers) via une requête HTTP POST :
    const formData: FormData = new FormData();
    // Ajout du fichier à l'objet FormData :
    formData.append('file', file, file.name);
    return this.http.post<boolean>(this.addExcelPersonnesUrl, formData);
  }



  /**
   * Méthode qui génère un fichier Excel pour y charger une liste de personnes.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public generateExcelFile() {
    return this.http.get<boolean>(this.generateExcelFileUrl);
  }



  /**
   * Méthode qui charge un fichier Csv contenant une liste de personnes.
   * @param file : fichier Csv qui contient la liste des personnes.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public importCsvFile(file: File) {
    // Création d'un objet FormData. Il est utilisé pour envoyer des données de formulaire (ex : fichiers) via une requête HTTP POST :
    const formData: FormData = new FormData();
    // Ajout du fichier à l'objet FormData :
    formData.append('file', file, file.name);
    return this.http.post<boolean>(this.addCsvPersonnesUrl, formData);
  }



  /**
   * Méthode qui génère un fichier Csv pour y charger une liste de personnes.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public generateCsvFile() {
    return this.http.get<boolean>(this.generateCsvFileUrl);
  }



  // *************************** TEST RECUPERER UNE IMAGE *************************** //
  /**
   * Méthode qui récupère la photo d'une personne.
   * @return String qui contient l'image.
   *
   */
  public getImagebase64(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get<string>(this.getPhotoUrl).subscribe(
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

