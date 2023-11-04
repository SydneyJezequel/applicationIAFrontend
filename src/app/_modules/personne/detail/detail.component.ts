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




  /* ************************************* REPRENDRE CES METHODES A L'INVERSE ************************************* */
  /* ************************************* REPRENDRE CES METHODES A L'INVERSE ************************************* */
  /* ************************************* REPRENDRE CES METHODES A L'INVERSE ************************************* */
    /*
   public async convertFileToBase64() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement; // On récupère l'élément du front.
    const file = fileInput.files?.[0]; // On récupère le fichier.

    if (file) {
      try {
        const base64String = await this.fileToBase64(file); // On convertit le fichier en String base64.
        console.log(base64String);
        console.log(typeof base64String);
        // Envoyer le fichier converti vers le backend
        this.personneService.uploadBase64(base64String).subscribe( // On l'envoie vers le back pour conversion en byte array et insertion en BDD.
          response => {
            console.log('Fichier envoyé avec succès au backend', response);
          },
          error => {
            console.error('Erreur lors de l\'envoi du fichier au backend', error);
          }
        );

      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Aucun fichier sélectionné.");
    }
  }


  public async fileToBase64(file: File): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => { // Renvoie une promesse (string si succès / null si échec)
      const reader = new FileReader(); // On créé un objet de type FileReader pour parcourir le fichier.
      reader.readAsDataURL(file); // On parcourt le fichier.
      reader.onload = () => resolve(reader.result as string); // Résultat si succès.
      reader.onerror = error => reject(error); // Résultat si échec.
    });
  }
    */
  /* ************************************* REPRENDRE CES METHODES A L'INVERSE ************************************* */
  /* ************************************* REPRENDRE CES METHODES A L'INVERSE ************************************* */
  /* ************************************* REPRENDRE CES METHODES A L'INVERSE ************************************* */










}

