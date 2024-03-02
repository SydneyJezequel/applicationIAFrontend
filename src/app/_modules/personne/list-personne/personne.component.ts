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
  public generationFichierExcel !: boolean;
  public generationFichierCsv !: boolean;





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
  public getAllPersonnes():void
  {
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
  deletePersonne(no_personne : number){
      this.personneService.deletePersonne(no_personne);
      window.location.reload(); // Re-chargement de la fenêtre.
  }



  /**
   * Méthode qui génère un fichier Excel pour y charger une liste de personnes.
   *
   */
  public generateExcelFile() {
    this.personneService.generateExcelFile().subscribe(
      (response: boolean) =>
      {
        this.generationFichierExcel = response;
        console.log(this.generationFichierExcel);
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
  public generateCsvFile() {
    this.personneService.generateCsvFile().subscribe(
      (response: boolean) =>
      {
        this.generationFichierCsv = response;
        console.log(this.generationFichierCsv);
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }






}

