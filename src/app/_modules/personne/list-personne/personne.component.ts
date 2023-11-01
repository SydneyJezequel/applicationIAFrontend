import { Component, OnInit } from '@angular/core';
import {PersonneServiceService} from "../../../_services/personne-service.service";
import {Personne} from "../../../model/personne.model";
import {HttpErrorResponse} from "@angular/common/http";







/******************************* Fonctionnalité qui liste les Personnes *******************************/

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






  /******************************* Constructeur *******************************/
  constructor(private personneService : PersonneServiceService) {
    this.personneService = personneService;
  }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
    this.getAll();
  }






  /******************************* Méthodes *******************************/

  /**
   * Méthode qui renvoie la liste de toutes les personnes.
   *
   */
  public getAll():void
  {
    this.personneService.getAllPersonne().subscribe(
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
   * Méthode qui supprime une list-personne.
   * @param no_personne
   */
  delete(no_personne : number){
      this.personneService.delete(no_personne);
      window.location.reload(); // Re-chargement de la fenêtre.
  }



  /**
   * Méthode qui génère un fichier Excel qui contient les données de la BDD.
   *
   */
  public generateExcel() {
    this.personneService.generateExcel().subscribe(
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







}

