import { Component, OnInit } from '@angular/core';
import { IaService } from "../../../_services/ia.service";
import { IrisModelRequest } from "../../../model/irisModelRequest";
import { Router } from "@angular/router";
import { IrisModelResponse } from "../../../model/irisModelResponse";






/******************************* Controller qui manipule le Modèle de prédiction des Iris *******************************/
@Component({
  selector: 'app-iris-model',
  templateUrl: './iris-model.component.html',
  styleUrls: ['./iris-model.component.scss']
})
export class IrisModelComponent implements OnInit {





  /******************************* Attributs *******************************/

  public sepalLength : number = 5.3;
  public sepalWidth : number =  3.3;
  public petalLength : number =  2.3;
  public petalWidth : number = 1.3;
  public request : string = "";
  public reponse !: any;
  public reponseIrisModel ?: string;
  public successInitialization : string = "Modèle ré-initialisé avec succès";
  public errorInitialization : string = "Echec lors de la ré-initialisation. Appelez votre informaticien préféré.";
  public displaySuccessResultInitialization !: string;
  public displayErrorInitialization !: string;
  public initializeResult !: boolean;





  /******************************* Constructeur *******************************/
  constructor(private iaService : IaService, private router: Router) { }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui exécute le modèle de machine Learning Random Forest.
   * Par défaut, ce modèle est utilisé pour prédire du type d'Iris.
   *
   */
  public async getIrisModelPrediction() {
    // Initialisation de la requête :
    let sepal_length : number = this.sepalLength;
    let sepal_width : number = this.sepalWidth;
    let petal_length : number = this.petalLength;
    let petal_width : number = this.petalWidth;
    const request: IrisModelRequest = {
      sepal_length,
      sepal_width,
      petal_length,
      petal_width
    };
    // Exécution de la requête :
    try {
      console.log("controller du Modele Iris appelé");
      console.log("Objet" + request);
      this.iaService.getIrisModelPrediction(request).then((response) => {
        this.reponseIrisModel = response.forecast.response;
        console.log(response);
        });
        console.log("Résultat :" + this.reponseIrisModel);
    } catch (error) {
        console.error('Erreur : ', error);
      }

  }



  /**
   * Méthode qui sauvegarde les prédictions du modèle.
   * Par défaut, le modèle Random Forest est utilisé sur le dataset de classification du type d'Iris.
   *
   */
  public saveIrisModelPrediction(): void {
    // Initialisation de la réponse à enregistrer :
    let sepal_length : number = this.sepalLength;
    let sepal_width : number = this.sepalWidth;
    let petal_length : number = this.petalLength;
    let petal_width : number = this.petalWidth;
    let prediction : string | undefined = this.reponseIrisModel;
    const resultToSave: IrisModelResponse = {
      sepal_length,
      sepal_width,
      petal_length,
      petal_width,
      prediction
    };
    // Enregistrement :
    try {
        // Enregistrement en BDD :
        this.iaService.saveIrisModelPrediction(resultToSave);
        // Redirection après l'ajout de l'enregistrement :
        this.router.navigate(['result-iris']);
      } catch (error) {
        console.error('Erreur : ', error);
      }

    }



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






}

