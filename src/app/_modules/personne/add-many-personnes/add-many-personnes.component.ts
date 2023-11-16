import { Component, OnInit } from '@angular/core';
import { PersonneServiceService } from "../../../_services/personne-service.service";




/******************************* Fonctionnalité d'Ajout de Personnes en masse *******************************/
@Component({
  selector: 'app-add-many-personnes',
  templateUrl: './add-many-personnes.component.html',
  styleUrls: ['./add-many-personnes.component.scss']
})
export class AddManyPersonnesComponent implements OnInit {




/******************************* Attributs *******************************/
  public successMessageExcel : string = 'Fichier Excel envoyé avec succès.';
  public displaySuccessMessageExcel !: string;
  public errorMessageExcel : string = 'Erreur lors de l\' enregistrement du fichier. Attention de respecter le format du fichier. ' +
  '1ere Ligne : Nom de colonnes. Format des lignes : "nom","prenom","date_naissance,"no_securite_sociale"';
  public displayErrorMessageExcel !: string;
  public successMessageCsv : string = 'Fichier Csv envoyé avec succès.';
  public displaySuccessMessageCsv !: string;
  public errorMessageCsv : string = 'Erreur lors de l\' enregistrement du fichier. Attention de respecter le format du fichier. ' +
  'Pas de nom de colonnes sur la première ligne. Format des lignes : "date naissance","no securite sociale","nom","prenom"';
  public displayErrorMessageCsv !: string;
  public selectedFile !: File;
  public integrationFichierExcel : boolean = false;
  public integrationFichierCsv : boolean = false;




/******************************* Constructeur *******************************/
  constructor(private personneService : PersonneServiceService) { }




/******************************* Initialisation *******************************/
  ngOnInit(): void {
  }




/******************************* Méthodes *******************************/


  /**
   * Méthode qui récupère le fichier de la vue.
   * @param event
   *
   */
  public onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }



  /**
   * Méthode qui charge le fichier Excel dans le backend.
   * @param event
   *
   */
  public uploadExcelFile() {
    if (this.selectedFile) {
      this.personneService.uploadExcelFile(this.selectedFile)
        .subscribe(
          (response : boolean) => {
            this.integrationFichierExcel = response;
            // Affichage des messages de succès ou d'erreur :
            if (this.integrationFichierExcel) {
              this.displaySuccessMessageExcel = this.successMessageExcel;
            } else {
              this.displayErrorMessageExcel = this.errorMessageExcel;
            }
          },
          (error) => {
            this.displayErrorMessageExcel = this.errorMessageExcel;
          }
        );
    } else {
      console.error('Aucun fichier sélectionné.');
    }
  }



  /**
   * Méthode qui charge le fichier Csv dans le backend.
   * @param event
   *
   */
  public uploadCsvFile() {
    if (this.selectedFile) {
      this.personneService.uploadCsvFile(this.selectedFile)
        .subscribe(
          (response : boolean) => {
            this.integrationFichierCsv = response;
            // Affichage des messages de succès ou d'erreur :
            if (this.integrationFichierCsv) {
              this.displaySuccessMessageCsv = this.successMessageCsv;
            } else {
              this.displayErrorMessageCsv = this.errorMessageCsv;
            }
          },
          (error) => {
            this.displayErrorMessageCsv = this.errorMessageCsv;
          }
        );
    } else {
      console.error('Aucun fichier sélectionné.');
    }
  }





}

