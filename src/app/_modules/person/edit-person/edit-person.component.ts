import { Component, OnInit } from '@angular/core';
import { PersonServiceService } from "../../../_services/person-service.service";
import { ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Person } from "../../../model/person.model";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";






/******************************* Controller d'Edition d'une Personne *******************************/
@Component({
  selector: 'app-edit-list-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent implements OnInit {





  /******************************* Attributs *******************************/

  public number !: number;
  public file !: any;
  public editPerson : Person = new Person();
  public photoBase64String !: string;





  /******************************* Constructeur *******************************/

  constructor(private route: ActivatedRoute, private personService : PersonServiceService, private router: Router) { }
  // Route : Utilisé pour configurer les routes.
  // ActivatedRoute : Utilisé pour extraire des informations dans la route d'un composant.





  /******************************* Initialisation *******************************/

  ngOnInit(): void {
    // Récupération de la Personne en fonction de l'Id de la Personne passé dans l'url :
    this.route.params.subscribe( params => {
      this.number = params['no_person'];
      console.log("number : "+ this.number);
      this.personService.getPersonById(this.number).subscribe(
        (response) =>
        {
          this.editPerson = response;
        }),
        (error:HttpErrorResponse) =>
        {
          alert(error.message);
        }
    })
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode édite une Personne.
   * Cette méthode appelle le service pour éditer une personne.
   * @param editPerson : Personne modifiée.
   *
   */
  public onEditPerson(): void {
     this.changePerson(this.editPerson);
    // Redirection :
    this.router.navigate(['persons']);
  }



  /**
   * Méthode d'édition d'une Personne.
   * Cette méthode appelle le service pour créer une personne.
   * @param person : Personne à modifier.
   *
   */
  public async changePerson(person: Person): Promise<void> {
    // Attributs :
    // Conversion de la date en format Java :
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(this.editPerson.birth_date, 'yyyy-MM-dd');
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
      this.editPerson.birth_date = new Date(formattedDate);
    }
    // Appel du service pour ajouter la person avec la photo :
    try {
      await this.personService.createPerson(this.editPerson, this.photoBase64String);
      console.log("Personne ajoutée avec succès.");
      // Redirection après l'ajout de la person :
      this.router.navigate(['personnes']);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la person : ', error);
    }
  }



  /**
   * Méthode qui se déclenche quand le fichier est ajoutée.
   * @param event d'ajout de la photo.
   *
   */
  public onFileSelected(event: Event): void {
    // Attributs :
    const inputElement = event.target as HTMLInputElement;
    const fileList: FileList | null = inputElement.files;
    // Traitements :
    if (fileList && fileList.length > 0) {
      this.file = fileList[0];
    } else {
      this.file = null;
    }
  }



  /**
   * Méthode qui convertit un fichier en string Base64.
   * @param file : Fichier de l'image.
   *
   */
  public async fileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      // On créé un objet de type FileReader pour parcourir le fichier :
      const reader = new FileReader();
      // On parcourt le fichier :
      reader.readAsDataURL(file);
      // Résultats en cas de succès ou d'erreur :
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }






}

