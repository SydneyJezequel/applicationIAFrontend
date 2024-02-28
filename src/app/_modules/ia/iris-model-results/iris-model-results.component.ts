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

  public listeResults !: IrisModelResponse[];
  public successInitialization : string = "Modèle ré-initialisé avec succès";
  public displaySuccessResultInitialization !: string;
  public errorInitialization : string = "Echec lors de la ré-initialisation. Appelez votre informaticien préféré.";
  public displayErrorInitialization !: string;
  public generationFichierExcel !: boolean;
  public generationFichierCsv !: boolean;
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
    this.getAllPredictions();
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui initialise le modèle de Machine Learning qui classe les Iris.
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
   * Méthode qui génère un fichier Excel qui contient
   * le DataSet du modèle des Iris.
   *
   */
  public async getIrisDataSet() {
    try {
      this.getIrisDataSetResult = await this.iaService.getIrisDataSet();
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
   * Méthode qui renvoie la liste des résultats du modèle de machine Learning
   * qui prédit le type des Iris.
   *
   */
  public getAllPredictions(): void {
    try {
      this.iaService.getAllPredictions().then((response) => {
        this.listeResults = response;
        console.log(response);
      });
      console.log("Résultat :" + this.listeResults);
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui génère un fichier Excel qui contient les données de la BDD.
   *
   */
  public generateExcel() {
    this.iaService.generateExcel().subscribe(
      (response: boolean) =>
      {
        this.generationFichierExcel = response;
        console.log(this.generationFichierExcel);
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }



  /**
   * Méthode qui génère un fichier Excel qui contient les données de la BDD.
   *
   */
  public generateCsv() {
    this.iaService.generateCsv().subscribe(
      (response: boolean) =>
      {
        this.generationFichierCsv = response;
        console.log(this.generationFichierCsv);
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }






}

