import { Component, OnInit } from '@angular/core';
import { IaService } from "../../../_services/ia.service";
import { IrisModelRequest } from "../../../model/irisModelRequest";




/******************************* Fonctionnalité qui Communique avec le Modèle de prédiction des Iris *******************************/
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
  public reponseModeleIris ?: string;





  /******************************* Constructeur *******************************/
  constructor(private iaService : IaService) { }




  /******************************* Initialisation *******************************/
  ngOnInit(): void {
  }




  /******************************* Méthodes *******************************/

  public async predict() {
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
    console.log("controller du Modele Iris appelé");
    try {
      console.log("controller du Modele Iris appelé");
      console.log("Objet" + request);
      this.iaService.getPrediction(request).then((response) => {
        this.reponseModeleIris = response.forecast.response;
        console.log(response);
        console.log("Résultat :" + this.reponseModeleIris);
        // console.log("Résultat :" + this.reponseModeleIris.response.reponse);
        // console.log("Résultat :" + this.reponseModeleIris.response);
        });
        console.log("Résultat :" + this.reponseModeleIris);
    } catch (error) {
        console.error('Erreur : ', error);
      }
  }


  public getPrediction2(): void {
    // ********* TEST **********
    console.log(this.sepalLength);
    console.log(this.sepalWidth);
    console.log(this.petalLength);
    console.log(this.petalWidth);
    // ********* TEST **********
    /*
    const request: IrisModelRequest = {
      sepal_length = this.sepalLength,
      sepal_width = this.sepalWidth,
      petal_length = this.petalLength,
      petal_width = this.petalWidth
    };

    try {
      console.log("controller du Modele Iris appelé");
      console.log("Objet" + request);
      this.iaService.getPrediction(request).then((response: string) => {
        this.reponseModeleIris = response;
        this.reponseModeleIris
        let test = this.reponseModeleIris;
        console.log(test.valueOf());
        console.log("Résultat :" + this.reponseModeleIris);
        // console.log("Résultat :" + this.reponseModeleIris.response.reponse);
        // console.log("Résultat :" + this.reponseModeleIris.response);
      });
      console.log("Résultat :" + this.reponseModeleIris);
    } catch (error) {
      console.error('Erreur : ', error);
    }
    */
  }



}

