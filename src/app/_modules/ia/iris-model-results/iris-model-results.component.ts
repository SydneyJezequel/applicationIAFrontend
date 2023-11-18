import { Component, OnInit } from '@angular/core';
import { IaService } from "../../../_services/ia.service";
import { IrisModelResponse } from "../../../model/irisModelResponse";




/******************************* Fonctionnalité qui affiche la liste des Prédictions générées *******************************/
@Component({
  selector: 'app-iris-model-results',
  templateUrl: './iris-model-results.component.html',
  styleUrls: ['./iris-model-results.component.scss']
})
export class IrisModelResultsComponent implements OnInit {




  /******************************* Attributs *******************************/
  public listeResults !: IrisModelResponse[];
  public messageSucces !: string;




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
      this.iaService.initializeModelPrediction().then((response) => {
        this.messageSucces = response;
        console.log(response);
      });
      console.log("Résultat de la ré-initialisation :" + this.messageSucces);
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



  // ********************************************** TEST ********************************************** //
  // ********************************************** TEST ********************************************** //
  // ********************************************** TEST ********************************************** //
  /**
   * Méthode qui entraine le modèle avec les paramètres et prédictions
   * générées par le user.
   *
   */
  public trainModelWithUserPredictions(): void{
    try {
      this.iaService.trainModelWithUserPredictions().then((response) => {
        this.listeResults = response;
        console.log("Résultat :" + response);
      });
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }
  // ********************************************** TEST ********************************************** //
  // ********************************************** TEST ********************************************** //
  // ********************************************** TEST ********************************************** //





}

