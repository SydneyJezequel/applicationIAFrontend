import { Component, OnInit } from '@angular/core';
import { VilleService } from "../../../_services/ville.service";
import { Ville } from "../../../model/ville.model";
import { HttpErrorResponse } from "@angular/common/http";






/******************************* Controller qui liste les Villes *******************************/
@Component({
  selector: 'app-list-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.scss']
})
export class VilleComponent implements OnInit {





  /******************************* Attributs *******************************/

  public villes !: Ville[];
  public ville !: Ville;




  /******************************* Constructeur *******************************/
  constructor(private villeService : VilleService) {
    this.villeService = villeService;
  }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
    this.getAllVille();
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui charge les villes depuis l'API en BDD
   * et les affiche.
   *
   */
  public loadApi():void
  {
    this.villeService.loadApi().subscribe(
      (response: Ville[]) =>
      {
        this.villes = response;
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
     window.location.reload(); // Re-chargement de la fenêtre.
  }



  /**
   * Méthode qui renvoie la liste de toutes les villes.
   *
   */
  public getAllVille():void
  {
    this.villeService.getAllVille().subscribe(
    (response: Ville[]) =>
    {
      this.villes = response;
    }),
    (error:HttpErrorResponse) =>
    {
      alert(error.message);
    }
  }



  /**
   * Méthode qui renvoie une ville en fonction de son Id.
   *
   */
  public findVille(no_ville:number):void
  {
    this.villeService.findVille(no_ville).subscribe(
    (response: Ville) =>
    {
      this.ville = response;
    }),
    (error:HttpErrorResponse) =>
    {
      alert(error.message);
    }
    // ******** TEST ******** //
  }



  /**
   * Méthode qui ajoute une ville.
   *
   */
  public async addVille(ville: Ville): Promise<void> {
    return this.villeService.addVille(ville);
  }



  /**
   * Méthode qui supprime une list-ville.
   *
   */
  public delete(no_ville:number):void
  {
    this.villeService.delete(no_ville);
    window.location.reload(); // Re-chargement de la fenêtre.
  }






}

