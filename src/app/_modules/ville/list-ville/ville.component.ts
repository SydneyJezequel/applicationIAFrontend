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
    this.getAllVilles();
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui charge les villes en BDD depuis une Api puis les affiche.
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
     // Re-chargement de la fenêtre :
     window.location.reload();
  }



  /**
   * Méthode qui récupère la liste de toutes les villes.
   *
   */
  public getAllVilles():void
  {
    this.villeService.getAllVilles().subscribe(
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
   * @param no_ville : id de la ville récupérée.
   *
   */
  public getVilleById(no_ville:number):void
  {
    this.villeService.getVilleById(no_ville).subscribe(
    (response: Ville) =>
    {
      this.ville = response;
    }),
    (error:HttpErrorResponse) =>
    {
      alert(error.message);
    }
  }



  /**
   * Méthode qui ajoute une ville.
   * @param ville : ville ajoutée.
   *
   */
  public async createVille(ville: Ville): Promise<void> {
    return this.villeService.createVille(ville);
  }



  /**
   * Méthode qui supprime une ville.
   * @param no_ville : id de la ville supprimée.
   *
   */
  public deleteVille(no_ville:number):void
  {
    this.villeService.deleteVille(no_ville);
    // Re-chargement de la fenêtre :
    window.location.reload();
  }






}

