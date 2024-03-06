import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Person } from "../model/person.model";






/******************************* Service qui gère les Personnes *******************************/
@Injectable({
  providedIn: 'root'
})
export class PersonServiceService {





  /******************************* Urls *******************************/

  private getAllUrl : string = "api/person/all";
  private idPersonUrl : string = "api/person/";
  private addPersonUrl : string = "api/person/add-person/";
  private deletePersonUrl : string = "api/person/delete/";
  private addExcelPersonsUrl : string = 'api/person/import/excel/';
  private addCsvPersonsUrl : string = 'api/person/import/csv/';
  private generateExcelFileUrl : string = "api/person/generateExcel";
  private generateCsvFileUrl : string = "/api/person/generateCsv";
  private getPhotoUrl : string = 'api/person/image-base64';





  /******************************* Constructeur *******************************/
  constructor(private http : HttpClient) { }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui récupère la liste de toutes les personnes.
   * @return Person[] : liste de toutes les personnes.
   *
   */
  public getAllPersons(): Observable<Person[]>  {
    return this.http.get<Person[]>(this.getAllUrl);
  }



  /**
   * Méthode qui récupère une personne.
   * @param no_person : id de la personne récupérée.
   * @return Personne : personne récupérée.
   *
   */
  public getPersonById(no_person:number): Observable<Person> {
    return this.http.get<Person>(this.idPersonUrl+no_person);
  }



  /**
   * Méthode qui enregistre une personne.
   * @param person : personne ajoutée.
   * @param photoBase64String : photo de la personne.
   *
   */
  public async createPerson(person: Person, photoBase64String: string): Promise<void> {
    try {
      const response = await this.http.post<Object>(this.addPersonUrl, { person, photoBase64String }).toPromise();
      console.log(response);
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui supprime une personne.
   * @param no_person : id de la personne supprimée.
   *
   */
  public deletePerson(no_person:number): void {
    console.log("Suppression : "+this.deletePersonUrl+no_person);
    this.http.delete(this.deletePersonUrl+no_person).subscribe(
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
  public importExcelFile(file: File): Observable<boolean> {
    // Création d'un objet FormData. Utilisé pour envoyer des données de formulaire (ex : fichiers) via une requête HTTP POST :
    const formData: FormData = new FormData();
    // Ajout du fichier à l'objet FormData :
    formData.append('file', file, file.name);
    return this.http.post<boolean>(this.addExcelPersonsUrl, formData);
  }



  /**
   * Méthode qui génère un fichier Excel pour y charger une liste de personnes.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public generateExcelFile(): Observable<boolean> {
    return this.http.get<boolean>(this.generateExcelFileUrl);
  }



  /**
   * Méthode qui charge un fichier Csv contenant une liste de personnes.
   * @param file : fichier Csv qui contient la liste des personnes.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public importCsvFile(file: File): Observable<boolean> {
    // Création d'un objet FormData : Utilisé pour envoyer des données de formulaire (ex : fichiers) via une requête HTTP POST :
    const formData: FormData = new FormData();
    // Ajout du fichier à l'objet FormData :
    formData.append('file', file, file.name);
    return this.http.post<boolean>(this.addCsvPersonsUrl, formData);
  }



  /**
   * Méthode qui génère un fichier Csv pour y charger une liste de personnes.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public generateCsvFile(): Observable<boolean> {
    return this.http.get<boolean>(this.generateCsvFileUrl);
  }



  // *************************** TEST RECUPERER UNE IMAGE *************************** //
  /**
   * Méthode qui récupère la photo d'une personne.
   * @return String : image récupérée.
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

