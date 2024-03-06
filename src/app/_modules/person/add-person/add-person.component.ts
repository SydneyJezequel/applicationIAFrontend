import { Component, OnInit } from '@angular/core';
import { PersonServiceService } from "../../../_services/person-service.service";
import { Person } from "../../../model/person.model";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";






/******************************* Controller d'Ajout d'une Personne *******************************/
@Component({
  selector: 'app-add-list-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {





  /******************************* Attributs *******************************/

  public addPerson: Person = new Person();
  public file !: any;
  public photoBase64String !: string;





  /******************************* Constructeur *******************************/
  constructor(private personService : PersonServiceService, private router: Router) { }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode d'exécution du Formulaire.
   *
   */
  public onSubmitPerson(): void {
    this.createPerson(this.addPerson);
    // Redirection :
    this.router.navigate(['persons']);
  }



  /**
   * Méthode qui enregistre une personne.
   * @param Person : personne ajoutée.
   *
   */
  public async createPerson(person: Person): Promise<void> {
    // Attributs :
    // Conversion de la date en format Java :
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(this.addPerson.birth_date, 'yyyy-MM-dd');
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
      this.addPerson.birth_date= new Date(formattedDate);
    }
    // Appel du service pour ajouter la person avec la photo :
    try {
      await this.personService.createPerson(this.addPerson, this.photoBase64String);
      console.log("Personne ajoutée avec succès.");
      // Redirection après l'ajout de la person :
      this.router.navigate(['personnes']);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la person : ', error);
    }

  }



  /**
   * Méthode qui se déclenche quand le fichier est ajoutée.
   * @param Event : Evènement d'ajout de la photo.
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
   * @param File : fichier contenant l'image.
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

