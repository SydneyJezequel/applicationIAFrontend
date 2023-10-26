import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Personne} from "../../../model/personne.model";
import {PersonneServiceService} from "../../../_services/personne-service.service";
import {ActivatedRoute, ParamMap} from '@angular/router';






/******************************* Fonctionnalité qui détaille une Personne *******************************/

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {






  /******************************* Attributs *******************************/
  public personneTrouve ?: Personne;
  public imageDataUrl !: any;






  /******************************* Constructeur *******************************/
  constructor(private personneService : PersonneServiceService,
              private route : ActivatedRoute) { }






  /******************************* Initialisation *******************************/
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('no_personne');
    let no_personne = id as unknown as number;
    this.personneService.findPersonne(no_personne);
    this.getOnePersonne(no_personne);
  }






  /******************************* Méthodes *******************************/


  /**
   * Méthode qui renvoie une list-personne en fonction de son Id.
   * @param no_personne
   */
  getOnePersonne(no_personne : number){
    console.log(" numéro de list-personne : " + no_personne);
    this.personneService.findPersonne(no_personne).subscribe(
      (response) =>
      {
        this.personneTrouve = response;   // Récupération de l'objet Personne.
        // ***************************** TEST ***************************** //
        console.log("AFFICHAGE DE LA PHOTO : " + this.personneTrouve.photo)
        // ***************************** TEST ***************************** //
        this.convertBlobToPhoto(this.personneTrouve.photo);   // Conversion du number[] en Blob puis en photo.
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }



  /**
   * Méthode qui convertit l'attribut Photo de type number[] en Blob.
   *
   */
  convertNumberArrayToBlob(photo: number[]): Blob {
    const uint8Array = new Uint8Array(photo);
    return new Blob([uint8Array], { type: 'image/png' }); // Remplacez 'image/jpeg' par le type MIME de votre image si nécessaire
  }



  /**
   * Méthode qui convertit le Blob en photo affichable.
   *
   */
  convertBlobToPhoto(photo: number[]){
    const blob: Blob = this.convertNumberArrayToBlob(photo); // Conversion de l'array Number en Blob.
    const reader = new FileReader();
    reader.onloadend = () => { // Parcours les donnnées stockées sous forme d'URL de données.
      this.imageDataUrl = reader.result; // Stocke l'URL de données dans la variable "imageDataUrl".
    };
    reader.readAsDataURL(blob); // Conversion du Blob en photo affichable.
  }






}

