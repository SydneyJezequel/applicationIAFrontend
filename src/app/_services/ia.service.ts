import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IrisModelRequest } from "../model/irisModelRequest";
import { IrisModelResponse } from "../model/irisModelResponse";
import {Observable} from "rxjs";




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
  private initializeModelIrisApiUrl: string = '/api/ia/iris/load-predict-in-model';
  private generateExcelFile: string = '/api/ia/iris/generate-excel';
  private generateCsvFile: string = '/api/ia/iris/generate-csv';
  private generateTemplateForExcelDataSet: string = '/api/ia/iris/generate-template-excel-dataset';
  private loadExcelDataSet:string = '/api/ia/iris/load-dataset-excel';
  private generateTemplateForCsvDataSet: string = '/api/ia/iris/generate-template-csv-dataset';
  private loadCsvDataSet:string = '/api/ia/iris/load-dataset-csv';





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



  /**
   * Méthode qui génère un fichier Excel contenant les personnes stockées en BDD.
   *
   */
  public generateExcel() {
    return this.http.get<boolean>(this.generateExcelFile);
  }



  /**
   * Méthode qui génère un fichier Excel contenant les personnes stockées en BDD.
   *
   */
  public generateCsv() {
    return this.http.get<boolean>(this.generateCsvFile);
  }





















  // ********************************************** TEST EXCEL ********************************************** //
  // ********************************************** TEST EXCEL ********************************************** //
  // ********************************************** TEST EXCEL ********************************************** //
  /**
   * Méthode qui intègre un fichier Excel contenant un nouveau set de données.
   *
   */
  public async uploadExcelFile(file: File): Promise<any> {
    const formData: FormData = new FormData(); // Création d'un objet FormData. Il est utilisé pour envoyer des données de formulaire (ex : fichiers) via une requête HTTP POST.
    formData.append('file', file, file.name); // Ajout du fichier à l'objet FormData.
    return this.http.post<boolean>(this.loadExcelDataSet, formData).toPromise(); // Envoi du formData vers le Back.
  }



  /**
   * Méthode qui génère un fichier de Template Excel
   * pour intégrer un nouveau jeu de données.
   *
   */
  public generateTemplateExcelForDataSet(): Observable<boolean> {
    return this.http.get<boolean>(this.generateTemplateForExcelDataSet);
  }

  // ********************************************** TEST EXCEL ********************************************** //
  // ********************************************** TEST EXCEL ********************************************** //
  // ********************************************** TEST EXCEL ********************************************** //












  // ********************************************** TEST CSV ********************************************** //
  // ********************************************** TEST CSV ********************************************** //
  // ********************************************** TEST CSV ********************************************** //

  /**
   * Méthode qui intègre un fichier Csv contenant un nouveau set de données.
   *
   */
  public uploadCsvTemplateFile(file: File): Promise<any> {
    const formData: FormData = new FormData(); // Création d'un objet FormData. Il est utilisé pour envoyer des données de formulaire (ex : fichiers) via une requête HTTP POST.
    formData.append('file', file, file.name); // Ajout du fichier à l'objet FormData.
    return this.http.post<boolean>(this.loadCsvDataSet, formData).toPromise(); // Envoi du formData vers le Back.
  }



  /**
   * Méthode qui génère un fichier de Template Csv
   * pour intégrer un nouveau jeu de données.
   *
   */
  public generateTemplateCsvForDataSet(): Observable<boolean>  {
    return this.http.get<boolean>(this.generateTemplateForCsvDataSet);
  }
  // ********************************************** TEST CSV ********************************************** //
  // ********************************************** TEST CSV ********************************************** //
  // ********************************************** TEST CSV ********************************************** //

















}

