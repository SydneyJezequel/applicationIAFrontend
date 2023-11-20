import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { IaService } from "../../../_services/ia.service";





/******************************* Fonctionnalité qui charge des données et entraine le modèle de classification des Iris *******************************/
@Component({
  selector: 'app-iris-model-new-dataset',
  templateUrl: './iris-model-new-dataset.component.html',
  styleUrls: ['./iris-model-new-dataset.component.scss']
})
export class IrisModelNewDatasetComponent implements OnInit {





  /******************************* Attributs *******************************/
  public generationFichierExcel !: boolean;
  public generationFichierCsv !: boolean;
  public integrationDataSetExcel !: boolean;
  public integrationDataSetCsv !: boolean;
  public successGenerationExcel : string = 'Fichier d\'intégration Excel généré avec succès.';
  public successGenerationCsv : string = 'Fichier d\'intégration Csv généré avec succès.';
  public successLoadingData: string = 'Données chargées. Modèle entrainé avec succès.';
  public displaySuccessMessageExcel !: string;
  public errorMessageExcel : string = 'Erreur lors de l\' enregistrement du fichier. Attention de bien renseigner des valeurs de type doubles dans les colonnes.';
  public displayErrorMessageExcel !: string;
  public displaySuccessMessageCsv !: string;
  public errorMessageCsv : string = 'Erreur lors de l\' enregistrement du fichier. Attention de bien renseigner des valeurs de type doubles dans les colonnes.';
  public displayErrorMessageCsv !: string;
  public selectedFile !: File;





  /******************************* Constructeur *******************************/
  constructor(private iaService : IaService) { }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui génère un fichier de Template Excel
   * pour charger un Dataset dans le modèle de classification des Iris.
   *
   */
  public generateTemplateExcelForDataSet() {
    this.iaService.generateTemplateExcelForDataSet().subscribe(
      (response: boolean) =>
      {
        this.generationFichierExcel = response;
        console.log(this.generationFichierExcel);
        if (this.generationFichierExcel) {
          this.displaySuccessMessageExcel = this.successGenerationExcel;
        } else {
          this.displayErrorMessageExcel = this.errorMessageExcel;
        }
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }



  /**
   * Méthode qui génère un fichier de Template Csv
   * pour charger un Dataset dans le modèle de classification des Iris.
   *
   */
  public generateTemplateCsvForDataSet() {
    this.iaService.generateTemplateCsvForDataSet().subscribe(
      (response: boolean) =>
      {
        this.generationFichierCsv = response;
        console.log(this.generationFichierCsv);
        if (this.generationFichierCsv) {
          this.displaySuccessMessageExcel = this.successGenerationCsv;
        } else {
          this.displayErrorMessageExcel = this.errorMessageExcel;
        }
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }



  /**
   * Méthode qui charge le fichier Excel du nouveau DataSet.
   * @param event
   *
   */
  public uploadDataSetExcelFile() {
    if (this.selectedFile) {
      this.iaService.uploadExcelFile(this.selectedFile)
        .then(
          (response : boolean) => {
            this.integrationDataSetExcel= response;
            // Affichage des messages de succès ou d'erreur :
            if (this.integrationDataSetExcel) {
              this.displaySuccessMessageExcel = this.successLoadingData;
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
   * Méthode qui charge le fichier Csv du nouveau DataSet.
   * @param event
   *
   */
  public uploadDataSetCsvFile() {
    if (this.selectedFile) {
      this.iaService.uploadCsvTemplateFile(this.selectedFile)
        .then(
          (response : boolean) => {
            this.integrationDataSetCsv= response;
            // Affichage des messages de succès ou d'erreur :
            if (this.integrationDataSetCsv) {
              this.displaySuccessMessageCsv = this.successLoadingData;
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



  /**
   * Méthode qui récupère le fichier de la vue.
   * @param event
   *
   */
  public onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }





}

