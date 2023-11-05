import { Component, OnInit } from '@angular/core';
import {PersonneServiceService} from "../../../_services/personne-service.service";
import {Personne} from "../../../model/personne.model";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";






/******************************* Fonctionnalité d'Ajout d'une Personne *******************************/

@Component({
  selector: 'app-add-list-personne',
  templateUrl: './add-personne.component.html',
  styleUrls: ['./add-personne.component.scss']
})
export class AddPersonneComponent implements OnInit {







  /******************************* Attributs *******************************/
  addPerson: Personne = new Personne();
  file!: File;
  // PARAMETRE TRANSFERT DE PHOTO :
  photoBase64String !: any;
  // PARAMETRE TRANSFERT DE PHOTO :







  /******************************* Constructeur *******************************/
  constructor(private personneService : PersonneServiceService, private router: Router) { }







  /******************************* Initialisation *******************************/
  ngOnInit(): void {
  }






  /******************************* Méthodes *******************************/


  /**
   * Méthode d'exécution du Formulaire.
   */
  onSubmitPersonne(){
    this.newPerson(this.addPerson);
  }



  /**
   * Méthode d'ajout d'une Personne.
   * Cette méthode appelle le service pour créer une Personne.
   * @param personne
   */
  public async newPerson(personne: Personne) {
    const datePipe = new DatePipe('en-US'); // Conversion de la date en format Java.
    const formattedDate = datePipe.transform(this.addPerson.date_naissance, 'yyyy-MM-dd');
    let photo = await this.convertToByteArray(this.file); // Conversion du fichier en objet Uint8Array.
    const byteArray: number[] = Array.from(photo); // Conversion de l'objet Uint8Array en array de nombre.
    this.addPerson.photo = byteArray; // On assigne l'array de nombre à l'attribut de l'objet Personne.

    console.log("this.addPerson.photo) : " + this.addPerson.photo); // Contrôle de la conversion de la photo.

    if (formattedDate !== null) { // Controle de la date formatée.
      this.addPerson.date_naissance = new Date(formattedDate);
      this.personneService.addPerson(this.addPerson); // Envoi de la nouvelle list-personne vers le backend.
    }
    this.router.navigate(['personnes']); // Redirection
  }
  // *********************** NOUVELLE VERSION DE LA METHODE ********************* //
  /*
  public async newPerson(personne: Personne) {
    const datePipe = new DatePipe('en-US'); // Conversion de la date en format Java.
    const formattedDate = datePipe.transform(this.addPerson.date_naissance, 'yyyy-MM-dd');

    // Transformation du fichier en photo :
    const fileInput = document.getElementById('fileInput') as HTMLInputElement; // On récupère l'élément du front.
    const file = fileInput.files?.[0]; // On récupère le fichier.
    if (file) {
      try {
        this.photoBase64String = await this.fileToBase64(file); // On convertit le fichier en String base64.
        console.log(this.photoBase64String);
        console.log(this.photoBase64String);
        console.log("this.addPerson.photo) : " + this.addPerson.photo); // Contrôle de la conversion de la photo.
      } catch (error) {
        console.error(error);
      }
    }
    // Controle de la date formatée :
    if (formattedDate !== null) {
      this.addPerson.date_naissance = new Date(formattedDate);
    }
    // Appel du service :
    this.personneService.addPerson(this.addPerso, this.photoBase64String); // Envoi de la nouvelle list-personne vers le backend.
    this.router.navigate(['personnes']); // Redirection
  }
  */
  // *********************** NOUVELLE VERSION DE LA METHODE ********************* //









  // *************************** TENTATIVE DE CONVERSION ***************************
  // *************************** TENTATIVE DE CONVERSION ***************************
  // *************************** TENTATIVE DE CONVERSION ***************************
  // *************************** TENTATIVE DE CONVERSION ***************************

  /**
   * Méthode qui convertit une image en Byte Array
   * @param photo à convertir en Byte Array.
   *
   */
  public convertToByteArray(file: Blob): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(); //  Lit le contenu d'un fichier en tant que données brutes (ArrayBuffer).
      reader.onloadend = () => { // Gestionnaire d'événements qui est appelé lorsque la lecture du fichier est terminée avec succès.
        const arrayBuffer = reader.result as ArrayBuffer; // Conversion du résultat en ArrayBuffer.
        if (arrayBuffer) {
          const uintArray = new Uint8Array(arrayBuffer); // Crée un objet Uint8Array à partir de l'ArrayBuffer.
          console.log("TYPE DE L'ARRAY : ")
          console.log(typeof uintArray);
          console.log("TYPE DE L'ARRAY : ")
          resolve(uintArray); // Si arrayBuffer n'est pas null ou undefined), la fonction résout.
        } else { // Renvoie d'une erreur :
          reject("Erreur lors de la conversion du fichier en tableau de bytes.");
        }
      };
      reader.onerror = () => {
        reject("Erreur lors de la lecture du fichier.");
      };
      const blob = new Blob([file], { type: 'text/plain' });
      console.log("TYPE DE L'ARRAY 2 : ")
      console.log(typeof file);
      console.log(typeof blob);
      console.log("TYPE DE L'ARRAY 2 : ")
      reader.readAsArrayBuffer(blob); // Le FileReader commence à lire le contenu du fichier en tant qu'ArrayBuffer.
    }); // L'opération est asynchrone, ce qui signifie qu'elle ne bloque pas l'exécution du reste du code.
  }



  /**
   * Méthode qui se déclenche quand le fichier est ajoutée.
   * @param évènement d'ajout de la photo.
   *
   */
  public onFileSelected(event: any): void {
    const inputElement: HTMLInputElement = event.target; //  Extrait l'élément DOM qui a déclenché l'événement, puis l'assigne à une variable inputElement.
    const fileList: FileList | null = inputElement.files; // On récupère les Fichiers de l'objet InputElement.

    if (fileList && fileList.length > 0) { // On vérifie si fileList is not null et s'il contient un fichier.
      const file: Blob = fileList[0]; // Extrait le premier fichier de la liste et l'assigne à la variable file.

      if (file instanceof Blob) { // Si le fichier est de type Blob
        this.convertToByteArray(file) // On le convertit en tableau de Byte.
          .then(byteArray => {
            // Faites quelque chose avec le tableau de bytes (byteArray)
          })
          .catch(error => {
            console.error(error);
          });
      } else { // Gestion de l'erreur :
        console.error("Le fichier sélectionné n'est pas valide.");
      }
    } else { // Gestion de l'erreur :
      console.error("Aucun fichier sélectionné.");
    }
  }
  // *************************** TENTATIVE DE CONVERSION ***************************
  // *************************** TENTATIVE DE CONVERSION ***************************
  // *************************** TENTATIVE DE CONVERSION ***************************
  // *************************** TENTATIVE DE CONVERSION ***************************





































  // *************************** TEST ENREGISTRER UNE IMAGE *************************** //
  // *************************** TEST ENREGISTRER UNE IMAGE *************************** //
  // *************************** TEST ENREGISTRER UNE IMAGE *************************** //

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
  // *************************** NOUVELLE VERSION DE LA METHODE *************************** :
  /*
  public async convertFileToBase64(event: any): void {
    const fileInput = document.getElementById('file') as HTMLInputElement; // On récupère l'élément du front.
    const file = fileInput.files?.[0]; // On récupère le fichier.

    if (file) {
      try {
        const base64String = await this.fileToBase64(file); // On convertit le fichier en String base64.
        console.log(base64String);
        console.log(typeof base64String);
        // Envoyer le fichier convertit vers le backend
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
  */


  public async fileToBase64(file: File): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => { // Renvoie une promesse (string si succès / null si échec)
      const reader = new FileReader(); // On créé un objet de type FileReader pour parcourir le fichier.
      reader.readAsDataURL(file); // On parcourt le fichier.
      reader.onload = () => resolve(reader.result as string); // Résultat si succès.
      reader.onerror = error => reject(error); // Résultat si échec.
    });
  }

  // *************************** TEST ENREGISTRER UNE IMAGE *************************** //
  // *************************** TEST ENREGISTRER UNE IMAGE *************************** //
  // *************************** TEST ENREGISTRER UNE IMAGE *************************** //













}



















// *************************** TENTATIVE DE CONVERSION ***************************
// *************************** TENTATIVE DE CONVERSION ***************************
// *************************** TENTATIVE DE CONVERSION ***************************
// *************************** TENTATIVE DE CONVERSION ***************************

/*
  public changeFile(file : File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  public uploadFile(event:any) {
    if (event.target.value) {
      const file = event.target.files[0];
      const type = file.type;
      this.changeFile(file).then((base64: string): any => {
        console.log(base64);
        this.fileBlob = this.b64Blob([base64], type);
        console.log(this.fileBlob)
      });
    } else alert('Nothing')
  }
*/
// *************************** TENTATIVE DE CONVERSION ***************************
// *************************** TENTATIVE DE CONVERSION ***************************
// *************************** TENTATIVE DE CONVERSION ***************************
// *************************** TENTATIVE DE CONVERSION ***************************
