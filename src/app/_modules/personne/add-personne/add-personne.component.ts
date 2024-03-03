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

  public addPersonne: Personne = new Personne();
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
  public onSubmitPersonne(): void {
    if (this.file) {
      this.createPersonne(this.addPersonne);
    } else {
      console.error("No file selected.");
    }
  }



  /**
   * Méthode qui ajoute une personne.
   * @param personne : personne ajoutée.
   *
   */
  public async createPersonne(personne: Personne): Promise<void> {
    // Attributs :
    // Conversion de la date en format Java :
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(this.addPersonne.date_naissance, 'yyyy-MM-dd');
    // Traitements :
    try {
      // On convertit le fichier en String base64 :
      this.photoBase64String = await this.fileToBase64(this.file);
      console.log(this.photoBase64String);
    } catch (error) {
      console.error(error);
      return;
    }
    // Controle de la date formatée :
    if (formattedDate !== null) {
      this.addPersonne.date_naissance = new Date(formattedDate);
    }
    // Appel du service pour ajouter la personne avec la photo :
    try {
      await this.personneService.createPersonne(this.addPersonne, this.photoBase64String);
      console.log("Personne ajoutée avec succès.");
      // Redirection après l'ajout de la personne :
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
  public onFileSelected(event: Event): void {
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
    return new Promise<string>((resolve, reject) => {
      // On créé un objet de type FileReader pour parcourir le fichier :
      const reader = new FileReader();
      // On parcourt le fichier :
      reader.readAsDataURL(file); // On parcourt le fichier.
      // Résultats en cas de succès ou d'erreur :
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }






}

