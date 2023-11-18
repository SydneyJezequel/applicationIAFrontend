import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IrisModelRequest } from "../model/irisModelRequest";
import { IrisModelResponse } from "../model/irisModelResponse";




/******************************* Service qui gère les Villes *******************************/
@Injectable({
  providedIn: 'root'
})
export class IaService {




  /******************************* Urls *******************************/
  private sendMessageToChatGpt: string = "/api/ia/chat-gpt/";
  private irisModelRequestUrl: string = '/api/ia/iris/predict';
  private irisModelsaveResponseUrl: string = '/api/ia/iris/save-predict';
  private irisModelResultsUrl: string = '/api/ia/iris/all-predict';
  private irisModelTrainWithUsersPredictionsUrl: string = '/api/ia/iris/load-predicts-in-model';
  private initializeModelIrisApiUrl: string = '/api/ia/iris/load-predict-in-model';




  /******************************* Constructeur *******************************/
  constructor(private http: HttpClient) {}




  /************************************** Méthodes **************************************/

  /**
   * Méthode qui initialise le modèle de Machine Learning qui classe les Iris.
   *
   */
  public async initializeModelPrediction(): Promise<any>{
    try {
      const response= await this.http.get<string>(this.initializeModelIrisApiUrl).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui envoie une requête à chatGpt et récupère sa réponse.
   *
   */
  public async sendMessage(message: string): Promise<string | undefined> {
    try {
      const response= await this.http.post<string>(this.sendMessageToChatGpt, message).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
      throw error;
    }
  }



  /**
   * Méthode qui envoie une requête au modèle de machine Learning qui prédit le type des Iris.
   *
   */
  public async getPrediction(request: IrisModelRequest): Promise<any>{
    try {
      const response= await this.http.post<string>(this.irisModelRequestUrl, request).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui enregistre le résultat du modèle de machine Learning
   * qui prédit le type des Iris.
   *
   */
  public async savePrediction(reponseModeleIris: IrisModelResponse) {
    try {
      console.log("Objet : ");
      console.log(reponseModeleIris);
      let result = await this.http.post<IrisModelResponse>(this.irisModelsaveResponseUrl, reponseModeleIris ).toPromise();
      console.log("Prédiction bien enregistrée en BDD : " + result);
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui renvoie la liste des résultats du modèle de machine Learning
   * qui prédit le type des Iris.
   *
   */
  public async getAllPredictions(): Promise<any>{
    try {
      const response= await this.http.get<IrisModelResponse[]>(this.irisModelResultsUrl).toPromise();
      console.log(response);
      return response;
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
  public async trainModelWithUserPredictions(): Promise<any>{
    try {
      const response = await this.http.get<string>(this.irisModelTrainWithUsersPredictionsUrl).toPromise();
        console.log("Résultat :" + response);
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }
  // ********************************************** TEST ********************************************** //
  // ********************************************** TEST ********************************************** //
  // ********************************************** TEST ********************************************** //





}

