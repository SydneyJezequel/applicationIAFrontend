import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { IaService } from "../../../_services/ia.service";






/******************************* Controller qui charge des données et entraine le modèle Random Forest *******************************/
@Component({
  selector: 'app-iris-model-new-dataset',
  templateUrl: './iris-model-new-dataset.component.html',
  styleUrls: ['./iris-model-new-dataset.component.scss']
})
export class IrisModelNewDatasetComponent implements OnInit {





  /******************************* Attributs *******************************/

  public generationExcelFile !: boolean;
  public generationCsvFile !: boolean;
  public integrationDataSetExcel !: boolean;
  public integrationDataSetCsv !: boolean;
  public successGenerationExcel : string = 'Fichier d\'intégration Excel généré avec succès.';
  public successGenerationCsv : string = 'Fichier d\'intégration Csv généré avec succès.';
  public successLoadingData: string = 'Données chargées. Modèle entrainé avec succès.';
  public displaySuccessMessageExcel !: string;
  public errorFileGeneration : string = 'Erreur lors de la génération du fichier. Si le problème persiste, veuillez appelez votre informaticien préféré.';
  public displayErrorMessageExcel !: string;
  public displaySuccessMessageCsv !: string;
  public errorFileLoading : string = 'Erreur lors de l\' enregistrement du fichier. Attention de bien renseigner des valeurs de type doubles dans les colonnes. Si le problème persiste, veuillez appelez votre informaticien préféré.';
  public displayErrorMessageCsv !: string;
  public selectedFile !: File;





  /******************************* Constructeur *******************************/
  constructor(private iaService : IaService) { }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui génère le fichier Excel de chargement du dataSet d'entrainement.
   * Par défaut, le modèle Random Forest est utilisé sur le dataset de classification du type d'Iris.
   *
   */
  public generateExcelFileTemplateForDataset(): void {
    this.iaService.generateExcelFileTemplateForDataset().subscribe(
      (response: boolean) =>
      {
        this.generationExcelFile = response;
        console.log(this.generationExcelFile);
        // Affichage des messages de succès ou d'erreur :
        if (this.generationExcelFile) {
          this.displaySuccessMessageExcel = this.successGenerationExcel;
        } else {
          this.displayErrorMessageExcel = this.errorFileGeneration;
        }
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }



  /**
   * Méthode qui génère le fichier csv de chargement du dataSet d'entrainement.
   * Par défaut, le modèle Random Forest est utilisé sur le dataset de classification du type d'Iris.
   *
   */
  public generateCsvFileTemplateForDataset(): void {
    this.iaService.generateCsvFileTemplateForDataset().subscribe(
      (response: boolean) =>
      {
        this.generationCsvFile = response;
        console.log(this.generationCsvFile);
        // Affichage des messages de succès ou d'erreur :
        if (this.generationCsvFile) {
          this.displaySuccessMessageCsv = this.successGenerationCsv;
        } else {
          this.displayErrorMessageCsv = this.errorFileGeneration;
        }
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }



  /**
   * Méthode qui charge le dataSet d'entrainement du modèle au format Excel.
   * Par défaut, le modèle Random Forest est utilisé sur le dataset de classification du type d'Iris.
   *
   */
  public importExcelTemplateDataSetFile(): void {
    if (this.selectedFile) {
      this.iaService.importExcelTemplateDataSetFile(this.selectedFile)
        .then(
          (response : boolean) => {
            this.integrationDataSetExcel = response;
            // Affichage des messages de succès ou d'erreur :
            if (this.integrationDataSetExcel) {
              this.displaySuccessMessageExcel = this.successLoadingData;
            } else {
              this.displayErrorMessageExcel = this.errorFileLoading;
            }
          },
          (error) => {
            this.displayErrorMessageExcel = this.errorFileLoading;
          }
        );
    } else {
      console.error('Aucun fichier sélectionné.');
    }
  }



  /**
   * Méthode qui charge le dataSet d'entrainement du modèle au format Csv.
   * Par défaut, le modèle Random Forest est utilisé sur le dataset de classification du type d'Iris.
   *
   */
  public importCsvTemplateDataSetFile(): void {
    if (this.selectedFile) {
      this.iaService.importCsvTemplateDataSetFile(this.selectedFile)
        .then(
          (response : boolean) => {
            this.integrationDataSetCsv= response;
            // Affichage des messages de succès ou d'erreur :
            if (this.integrationDataSetCsv) {
              this.displaySuccessMessageCsv = this.successLoadingData;
            } else {
              this.displayErrorMessageCsv = this.errorFileLoading;
            }
          },
          (error) => {
            this.displayErrorMessageCsv = this.errorFileLoading;
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
  public onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }






}

