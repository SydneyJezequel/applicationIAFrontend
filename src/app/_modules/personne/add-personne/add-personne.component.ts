import { Component, OnInit } from '@angular/core';
import { PersonneServiceService } from "../../../_services/personne-service.service";
import { Personne } from "../../../model/personne.model";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";






/******************************* Controller d'Ajout d'une Personne *******************************/
@Component({
  selector: 'app-add-list-personne',
  templateUrl: './add-personne.component.html',
  styleUrls: ['./add-personne.component.scss']
})
export class AddPersonneComponent implements OnInit {





  /******************************* Attributs *******************************/

  public addPerson: Personne = new Personne();
  public file !: any;
  public photoBase64String !: string;





  /******************************* Constructeur *******************************/
  constructor(private personneService : PersonneServiceService, private router: Router) { }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode d'exécution du Formulaire.
   *
   */
  public onSubmitPersonne() {
    if (this.file) {
      this.newPerson(this.addPerson);
    } else {
      console.error("No file selected.");
    }
  }



  /**
   * Méthode d'ajout d'une personne.
   * Cette méthode appelle le service pour créer une personne.
   * @param personne
   *
   */
  public async newPerson(personne: Personne) {
    const datePipe = new DatePipe('en-US'); // Conversion de la date en format Java.
    const formattedDate = datePipe.transform(this.addPerson.date_naissance, 'yyyy-MM-dd');

    try {
      this.photoBase64String = await this.fileToBase64(this.file); // On convertit le fichier en String base64.
      console.log(this.photoBase64String);
    } catch (error) {
      console.error(error);
      return;
    }

    // Controle de la date formatée :
    if (formattedDate !== null) {
      this.addPerson.date_naissance = new Date(formattedDate);
    }

    // Appel du service pour ajouter la personne avec la photo :
    try {
      await this.personneService.addPerson(this.addPerson, this.photoBase64String);
      console.log("Personne ajoutée avec succès.");

      // Redirection après l'ajout de la personne.
      this.router.navigate(['personnes']);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la personne : ', error);
    }

  }



  /**
   * Méthode qui se déclenche quand le fichier est ajoutée.
   * @param event d'ajout de la photo.
   *
   */
  public onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const fileList: FileList | null = inputElement.files;

    if (fileList && fileList.length > 0) {
      this.file = fileList[0];
    } else {
      this.file = null;
    }
  }



  /**
   * Méthode qui convertit un fichier en string Base64.
   * @param file
   *
   */
  public async fileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => { // Renvoie une promesse (string si succès / null si échec)
      const reader = new FileReader(); // On créé un objet de type FileReader pour parcourir le fichier.
      reader.readAsDataURL(file); // On parcourt le fichier.
      reader.onload = () => resolve(reader.result as string); // Résultat si succès.
      reader.onerror = error => reject(error); // Résultat si échec.
    });
  }






}

