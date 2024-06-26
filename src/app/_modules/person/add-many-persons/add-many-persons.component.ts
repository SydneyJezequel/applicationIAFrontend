import { Component, OnInit } from '@angular/core';
import { PersonServiceService } from "../../../_services/person-service.service";






/*********************** Controller chargeant des Personnes en masse à partir d'un fichier ***********************/
@Component({
  selector: 'app-add-many-persons',
  templateUrl: './add-many-persons.component.html',
  styleUrls: ['./add-many-persons.component.scss']
})
export class AddManyPersonsComponent implements OnInit {





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
  public integrationExcelFile : boolean = false;
  public integrationCsvFile : boolean = false;





  /******************************* Constructeur *******************************/
  constructor(private personService : PersonServiceService) { }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui récupère un fichier déposé dans la vue.
   * @param event : Ajout d'un fichier dans la vue.
   *
   */
  public onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }



  /**
   * Méthode qui charge un fichier Excel contenant une liste de personnes.
   *
   */
  public importExcelFile(): void {
    if (this.selectedFile) {
      this.personService.importExcelFile(this.selectedFile)
        .subscribe(
          (response : boolean) => {
            this.integrationExcelFile = response;
            // Affichage des messages de succès ou d'erreur :
            if (this.integrationExcelFile) {
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
   * Méthode qui charge un fichier Csv contenant une liste de personnes.
   *
   */
  public importCsvFile(): void {
    if (this.selectedFile) {
      this.personService.importCsvFile(this.selectedFile)
        .subscribe(
          (response : boolean) => {
            this.integrationCsvFile = response;
            // Affichage des messages de succès ou d'erreur :
            if (this.integrationCsvFile) {
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

