import { Component, OnInit } from '@angular/core';
import { PersonneServiceService } from "../../../_services/personne-service.service";
import { ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Personne } from "../../../model/personne.model";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";






/******************************* Controller d'Edition d'une Personne *******************************/
@Component({
  selector: 'app-edit-list-personne',
  templateUrl: './edit-personne.component.html',
  styleUrls: ['./edit-personne.component.scss']
})
export class EditPersonneComponent implements OnInit {





  /******************************* Attributs *******************************/

  public numero !: number;
  public file !: any;
  public editPersonne : Personne = new Personne();
  public photoBase64String !: string;





  /******************************* Constructeur *******************************/

  constructor(private route: ActivatedRoute, private personneService : PersonneServiceService, private router: Router) { }
  // Route : Utilisé pour configurer les routes.
  // ActivatedRoute : Utilisé pour extraire des informations dans la route d'un composant.





  /******************************* Initialisation *******************************/

  ngOnInit(): void {
    // Récupération de la Personne en fonction de l'Id de la Personne passé dans l'url :
    this.route.params.subscribe( params => {
      this.numero = params['no_personne'];
      this.personneService.getPersonneById(this.numero).subscribe(
        (response) =>
        {
          this.editPersonne = response;
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
   * Cette méthode appelle le service pour éditer une Personne.
   * @param editPersonne : Personne modifiée.
   *
   */
  public onEditPersonne(): void {
    if (this.file) {
      this.changePerson(this.editPersonne);
    } else {
      console.error("No file selected.");
    }
    // Redirection :
    this.router.navigate(['personnes']);
  }



  /**
   * Méthode d'édition d'une Personne.
   * Cette méthode appelle le service pour créer une Personne.
   * @param personne
   *
   */
  public async changePerson(personne: Personne): Promise<void> {
    // Attributs :
    // Conversion de la date en format Java :
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(this.editPersonne.date_naissance, 'yyyy-MM-dd');
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
      this.editPersonne.date_naissance = new Date(formattedDate);
    }
    // Appel du service pour ajouter la personne avec la photo :
    try {
      await this.personneService.createPersonne(this.editPersonne, this.photoBase64String);
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
   * @param file
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

