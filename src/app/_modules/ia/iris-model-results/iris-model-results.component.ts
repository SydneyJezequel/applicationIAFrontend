import { Component, OnInit } from '@angular/core';
import { IaService } from "../../../_services/ia.service";
import { IrisModelResponse } from "../../../model/irisModelResponse";
import { HttpErrorResponse } from "@angular/common/http";






/******************************* Controller gérant les Prédictions générées par le modèle *******************************/
@Component({
  selector: 'app-iris-model-results',
  templateUrl: './iris-model-results.component.html',
  styleUrls: ['./iris-model-results.component.scss']
})
export class IrisModelResultsComponent implements OnInit {





  /******************************* Attributs *******************************/

  public resultsList !: IrisModelResponse[];
  public successInitialization : string = "Modèle ré-initialisé avec succès";
  public displaySuccessResultInitialization !: string;
  public errorInitialization : string = "Echec lors de la ré-initialisation. Appelez votre informaticien préféré.";
  public displayErrorInitialization !: string;
  public generationExcelFile !: boolean;
  public generationCsvFile !: boolean;
  public initializeResult !: boolean;
  public getIrisDataSetResult !: boolean;
  public successGetDataSet : string = "Fichier excel du dataSet généré avec succès";
  public errorGetDataSet : string = "Erreur lors de la génération du fichier excel du dataSet";
  public displaySuccessGetDataSet !: string;
  public displayErrorGetDataSet !: string;





  /******************************* Constructeur *******************************/
  constructor(private iaService : IaService) { }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
    this.getAllIrisModelPredictions();
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui initialise le modèle de Machine Learning Random Forest.
   * Par défaut, ce modèle est utilisé sur le dataset de classification du type d'Iris.
   *
   */
  public initializeModelPrediction(): void {
    try {
      this.iaService.initializeModelPrediction().then((response : boolean) => {
        this.initializeResult = response;
        console.log(this.initializeResult);
        if(this.initializeResult){
          this.displaySuccessResultInitialization = this.successInitialization;
        }else{
          this.displayErrorInitialization = this.errorInitialization;
        }
        console.log(" Résultat : " + this.displaySuccessResultInitialization + " " + this.displayErrorInitialization);
      });
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui génère le fichier Excel contenant les données du DataSet Iris.
   *
   */
  public async getIrisDataSet(): Promise<void> {
    try {
      this.getIrisDataSetResult = await this.iaService.generateExcelFileForIrisDataSet();
      console.log(this.getIrisDataSetResult);
      if (this.getIrisDataSetResult) {
        this.displaySuccessGetDataSet = this.successGetDataSet;
      } else {
        this.displayErrorGetDataSet = this.errorGetDataSet;
      }
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui renvoie la liste des prédictions générées par le modèle.
   * Par défaut, le modèle Random Forest est utilisé sur le dataset de classification du type d'Iris.
   *
   */
  public getAllIrisModelPredictions(): void {
    try {
      this.iaService.getAllIrisModelPredictions().then((response) => {
        this.resultsList = response;
        console.log(response);
      });
      console.log("Résultat :" + this.resultsList);
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui génère un fichier Excel contenant les prédictions du modèle.
   * Par défaut, le modèle Random Forest est utilisé sur le dataset de classification du type d'Iris.
   *
   */
  public generateExcelFileForPredictions(): void {
    this.iaService.generateExcelFileForPredictions().subscribe(
      (response: boolean) =>
      {
        this.generationExcelFile = response;
        console.log(this.generationExcelFile);
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }



  /**
   * Méthode qui génère un fichier Csv contenant les prédictions du modèle.
   * Par défaut, le modèle Random Forest est utilisé sur le dataset de classification du type d'Iris.
   *
   */
  public generateCsvFileForPredictions(): void {
    this.iaService.generateCsvFileForPredictions().subscribe(
      (response: boolean) =>
      {
        this.generationCsvFile = response;
        console.log(this.generationCsvFile);
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }






}

