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




  /******************************* Constructeur *******************************/
  constructor(private http: HttpClient) {
  }




  /******************************* Méthodes controleur *******************************/

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




}

