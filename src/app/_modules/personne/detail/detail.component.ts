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
    this.personneService.getPersonneById(no_personne);
    this.getOnePersonne(no_personne);
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui renvoie une personne en fonction de son Id.
   * @param no_personne
   */
  public getOnePersonne(no_personne : number): void {
    console.log(" numéro de personne : " + no_personne);
    this.personneService.getPersonneById(no_personne).subscribe(
      (response) =>
      {
        // Récupération de l'objet Personne :
        this.personneTrouve = response;
        console.log("AFFICHAGE DE LA PHOTO : " + this.personneTrouve.photo)
        // Conversion du number[] en Blob puis en photo :
        this.convertBlobToPhoto(this.personneTrouve.photo);
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
    return new Blob([uint8Array], { type: 'image/png' });
  }



  /**
   * Méthode qui convertit le Blob en photo affichable.
   *
   */
  public convertBlobToPhoto(photo: number[]): void {
    // Conversion de l'array Number en Blob :
    const blob: Blob = this.convertNumberArrayToBlob(photo);
    const reader = new FileReader();
    // Parcours les donnnées stockées sous forme d'URL de données :
    reader.onloadend = () => {
      // Stocke l'URL de données :
      this.imageDataUrl = reader.result;
    };
    // Conversion du Blob en photo affichable :
    reader.readAsDataURL(blob);
  }
  // *************************** ANCIENNE VERSION - RECUPERER ET AFFICHER UNE IMAGE *************************** //



  // *************************** TEST RECUPERER ET AFFICHER UNE IMAGE *************************** //
  /**
   * Méthode qui récupère la photo d'une personne.
   *
   */
  public async getImagebase64(): Promise<void> {
    this.base64String = await this.personneService.getImagebase64();
    console.log("base64String : " + this.base64String);
  }
  // *************************** TEST RECUPERER ET AFFICHER UNE IMAGE *************************** //






}

