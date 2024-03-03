import { Component, OnInit } from '@angular/core';
import { PersonneServiceService } from "../../../_services/personne-service.service";
import { Personne } from "../../../model/personne.model";
import { HttpErrorResponse } from "@angular/common/http";






/******************************* Controller qui liste les Personnes *******************************/
@Component({
  selector: 'app-list-personne',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.scss']
})

export class PersonneComponent implements OnInit {





  /******************************* Attributs *******************************/

  public personne !: Personne;
  public personnes !: Personne[];
  public no_personne !: number;
  public generationExcelFile !: boolean;
  public generationCsvFile !: boolean;





  /******************************* Constructeur *******************************/
  constructor(private personneService : PersonneServiceService) {
    this.personneService = personneService;
  }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
    this.getAllPersonnes();
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui récupère la liste de toutes les personnes.
   *
   */
  public getAllPersonnes(): void {
    this.personneService.getAllPersonnes().subscribe(
      (response: Personne[]) =>
      {
        this.personnes = response;
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }



  /**
   * Méthode qui supprime une personne.
   * @param no_personne : id de la personne supprimée.
   *
   */
  public deletePersonne(no_personne : number): void {
    this.personneService.deletePersonne(no_personne);
    // Re-chargement de la fenêtre :
    window.location.reload();
  }



  /**
   * Méthode qui génère un fichier Excel pour y charger une liste de personnes.
   *
   */
  public generateExcelFile(): void {
    this.personneService.generateExcelFile().subscribe(
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
    this.personneService.generateCsvFile().subscribe(
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

