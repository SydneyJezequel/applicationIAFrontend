import { Component, OnInit } from '@angular/core';
import { PersonServiceService } from "../../../_services/person-service.service";
import { Person } from "../../../model/person.model";
import { HttpErrorResponse } from "@angular/common/http";






/******************************* Controller qui liste les Personnes *******************************/
@Component({
  selector: 'app-list-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})

export class PersonComponent implements OnInit {





  /******************************* Attributs *******************************/

  public person !: Person;
  public persons !: Person[];
  public no_person !: number;
  public generationExcelFile !: boolean;
  public generationCsvFile !: boolean;





  /******************************* Constructeur *******************************/
  constructor(private personService : PersonServiceService) {
    this.personService = personService;
  }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
    this.getAllPersons();
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui récupère la liste de toutes les personnes.
   *
   */
  public getAllPersons(): void {
    this.personService.getAllPersons().subscribe(
      (response: Person[]) =>
      {
        this.persons = response;
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }



  /**
   * Méthode qui supprime une personne.
   * @param no_person : id de la personne supprimée.
   *
   */
  public deletePerson(no_person : number): void {
    console.log("number : "+no_person);
    this.personService.deletePerson(no_person);
    // Re-chargement de la fenêtre :
    window.location.reload();
  }



  /**
   * Méthode qui génère un fichier Excel pour y charger une liste de personnes.
   *
   */
  public generateExcelFile(): void {
    this.personService.generateExcelFile().subscribe(
      (response: boolean) =>
      {
        this.generationExcelFile = response;
        console.log(this.generationExcelFile);
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }



  /**
   * Méthode qui génère un fichier Csv pour y charger une liste de personnes.
   *
   */
  public generateCsvFile(): void {
    this.personService.generateCsvFile().subscribe(
      (response: boolean) =>
      {
        this.generationCsvFile = response;
        console.log(this.generationCsvFile);
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }






}

