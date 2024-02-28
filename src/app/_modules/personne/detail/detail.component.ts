import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { Personne } from "../../../model/personne.model";
import { PersonneServiceService } from "../../../_services/personne-service.service";
import { ActivatedRoute, ParamMap } from '@angular/router';






/******************************* Controller qui affiche le détail d'une Personne *******************************/
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {





  /******************************* Attributs *******************************/

  public personneTrouve ?: Personne;
  public imageDataUrl !: any;
  // ************ TEST AFFICHAGE PHOTO *********** //
  public base64String !: string;
  // ************ TEST AFFICHAGE PHOTO *********** //





  /******************************* Constructeur *******************************/
  constructor(private personneService : PersonneServiceService,
              private route : ActivatedRoute) { }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('no_personne');
    let no_personne = id as unknown as number;
    this.personneService.findPersonne(no_personne);
    this.getOnePersonne(no_personne);
    // ************ TEST AFFICHAGE PHOTO *********** //
    // this.getPhoto();
    // ************ TEST AFFICHAGE PHOTO *********** //
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui renvoie une personne en fonction de son Id.
   * @param no_personne
   */
  public getOnePersonne(no_personne : number){
    console.log(" numéro de personne : " + no_personne);
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



  // *************************** ANCIENNE VERSION - RECUPERER ET AFFICHER UNE IMAGE *************************** //
  /**
   * Méthode qui convertit l'attribut Photo de type number[] en Blob.
   *
   */
  public convertNumberArrayToBlob(photo: number[]): Blob {
    const uint8Array = new Uint8Array(photo);
    return new Blob([uint8Array], { type: 'image/png' }); // Remplacez 'image/jpeg' par le type MIME de votre image si nécessaire
  }



  /**
   * Méthode qui convertit le Blob en photo affichable.
   *
   */
  public convertBlobToPhoto(photo: number[]){
    const blob: Blob = this.convertNumberArrayToBlob(photo); // Conversion de l'array Number en Blob.
    const reader = new FileReader();
    reader.onloadend = () => { // Parcours les donnnées stockées sous forme d'URL de données.
      this.imageDataUrl = reader.result; // Stocke l'URL de données dans la variable "imageDataUrl".
    };
    reader.readAsDataURL(blob); // Conversion du Blob en photo affichable.
  }
  // *************************** ANCIENNE VERSION - RECUPERER ET AFFICHER UNE IMAGE *************************** //



  // *************************** TEST RECUPERER ET AFFICHER UNE IMAGE *************************** //
  /**
   * Méthode qui récupère une image.
   *
   */
  public async getPhoto() {
    this.base64String = await this.personneService.getPicture();
    console.log("base64String : " + this.base64String);
  }
  // *************************** TEST RECUPERER ET AFFICHER UNE IMAGE *************************** //






}

