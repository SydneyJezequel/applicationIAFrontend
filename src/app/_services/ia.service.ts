import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IrisModelRequest } from "../model/irisModelRequest";
import { IrisModelResponse } from "../model/irisModelResponse";
import { Observable } from "rxjs";






/******************************* Service qui gère les IA *******************************/
@Injectable({
  providedIn: 'root'
})
export class IaService {





  /******************************* Urls pour manipuler les modèles d'IA *******************************/

  // Urls pour manipuler l'Api de Chat Gpt :
  private sendMessageToChatGpt: string = '/api/ia/chat-gpt/send-prompt';

  // Urls du modèle de classification des Iris :
  private irisModelRequestUrl: string = '/api/ia/iris/predict';
  private irisModelsaveResponseUrl: string = '/api/ia/iris/save-predict';
  private irisModelResultsUrl: string = '/api/ia/iris/all-predict';
  private initializeModelIrisApiUrl: string = '/api/ia/iris/load-predict-in-model';
  private generateExcelFileUrl: string = '/api/ia/iris/generate-excel';
  private generateCsvFileUrl: string = '/api/ia/iris/generate-csv';
  private generateTemplateForExcelDataSetUrl: string = '/api/ia/iris/generate-template-excel-dataset';
  private loadExcelDataSetUrl: string = '/api/ia/iris/load-dataset-excel';
  private generateTemplateForCsvDataSetUrl: string = '/api/ia/iris/generate-template-csv-dataset';
  private loadCsvDataSetUrl: string = '/api/ia/iris/load-dataset-csv';
  private getIrisDataSetApiUrl: string = '/api/ia/iris/generate-iris-dataset-excel';

  // Urls du modèle de reconnaissance faciale :
  private loadTrainingSetFileUrl: string = '/api/ia/face-recognizer/process-training-set-file-image-zip';
  private loadValidationSetFileUrl: string = '/api/ia/face-recognizer/process-validation-set-file-image-zip';
  private loadIdentifyFaceFileUrl: string = '/api/ia/face-recognizer/process-identify-face-image';
  private recognizeFaceTrainingUrl : string = '/api/ia/face-recognizer/recognize-face-training';
  private recognizeFaceValidationUrl: string = '/api/ia/face-recognizer/recognize-face-test';
  private useRecognizeFaceModelUrl: string = '/api/ia/face-recognizer/use-recognize-face';
  private initializeFaceRecognizerModelUrl: string = '/api/ia/face-recognizer/initialize';
  private getListModelUrl: string = '/api/ia/face-recognizer/models-list';
  private selectModelUrl: string = '/api/ia/face-recognizer/model-selection';

  // Urls du modèle de génération d'image GAN :
  private loadParametersGenFileUrl: string = '/api/ia/gan-image-generation/process-parameters-gen-file';
  private generateGANImageUrl: string = '/api/ia/gan-image-generation/generate-faces';
  private trainGANModelUrl: string = '/api/ia/gan-image-generation/train-gan-model';

  // Urls du modèle d'Embedding :
  private generateTemplateForJsonlDataSetUrl: string = '/api/ia/embedding/generate-template-jsonl-dataset';
  private loadDataFileUrl: string = '/api/ia/embedding/process-jsonl-dataset';
  private initializeDataSetUrl: string = '/api/ia/embedding/load-dataset';
  private selectCategoryUrl: string = '/api/ia/embedding/select-category';
  private getCategoriesListUrl: string = '/api/ia/embedding/get-categories-list';
  private generateEmbeddingAnswerUrl: string = '/api/ia/embedding/get-llm-embedding-answer/';





  /******************************* Constructeur *******************************/
  constructor(private http: HttpClient) {}





  /************************************** Méthodes de l'API de chatGPT **************************************/

  /**
   * Méthode qui envoie le prompt à l'Api de chatGpt et renvoie sa réponse.
   * @param prompt : message envoyé à chatGpt.
   * @return response : réponse.
   *
   */
  public async chat(prompt: string): Promise<string | undefined> {
    try {
      const response= await this.http.post<string>(this.sendMessageToChatGpt, prompt).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
      throw error;
    }
  }





  /************************************** Méthodes du Modèle Random Forest **************************************/

  /**
   * Méthode qui initialise le modèle de Machine Learning Random Forest.
   * Par défaut, ce modèle est utilisé sur le dataset de classification du type d'Iris.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public async initializeModelPrediction(): Promise<any> {
    try {
      const response= await this.http.get<boolean>(this.initializeModelIrisApiUrl).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui génère le fichier Excel contenant les données du DataSet Iris.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public async generateExcelFileForIrisDataSet(): Promise<any> {
    try {
      const response= await this.http.get<boolean>(this.getIrisDataSetApiUrl).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui exécute le modèle de machine Learning Random Forest.
   * Par défaut, ce modèle est utilisé pour prédire du type d'Iris
   * @param IrisModelRequest request : Paramètres du modèle.
   * @return String : Prédiction générée.
   *
   */
  public async getIrisModelPrediction(request: IrisModelRequest): Promise<any> {
    try {
      const response= await this.http.post<string>(this.irisModelRequestUrl, request).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui sauvegarde les prédictions du modèle.
   * Par défaut, le modèle Random Forest est utilisé sur le dataset de classification du type d'Iris.
   * @param irisModelResponse : Paramètres passés aux modèles et prédiction réalisée.
   *
   */
  public async saveIrisModelPrediction(reponseModeleIris: IrisModelResponse): Promise<void> {
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
   * Méthode qui renvoie la liste des prédictions générées par le modèle.
   * Par défaut, le modèle Random Forest est utilisé sur le dataset de classification du type d'Iris.
   * @return IrisModelResponse[] : La liste des prédictions.
   *
   */
  public async getAllIrisModelPredictions(): Promise<any> {
    try {
      const response= await this.http.get<IrisModelResponse[]>(this.irisModelResultsUrl).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui génère un fichier Excel contenant les prédictions du modèle.
   * Par défaut, le modèle Random Forest est utilisé sur le dataset de classification du type d'Iris.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public generateExcelFileForPredictions(): Observable<boolean> {
    return this.http.get<boolean>(this.generateExcelFileUrl);
  }



  /**
   * Méthode qui génère un fichier Csv contenant les prédictions du modèle.
   * Par défaut, le modèle Random Forest est utilisé sur le dataset de classification du type d'Iris.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public generateCsvFileForPredictions(): Observable<boolean> {
    return this.http.get<boolean>(this.generateCsvFileUrl);
  }



  /**
   * Méthode qui charge le dataSet d'entrainement du modèle au format Excel.
   * Par défaut, le modèle Random Forest est utilisé sur le dataset de classification du type d'Iris.
   * @param file : fichier Excel contenant le jeu de données.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public async importExcelTemplateDataSetFile(file: File): Promise<any> {
    // Création d'un objet FormData. Utilisé pour envoyer des données de formulaire (ex : fichiers) via une requête HTTP POST :
    const formData: FormData = new FormData();
    // Ajout du fichier à l'objet FormData :
    formData.append('file', file, file.name);
    return this.http.post<boolean>(this.loadExcelDataSetUrl, formData).toPromise();
  }



  /**
   * Méthode qui génère le fichier Excel de chargement du dataSet d'entrainement.
   * Par défaut, le modèle Random Forest est utilisé sur le dataset de classification du type d'Iris.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public generateExcelFileTemplateForDataset(): Observable<boolean> {
    return this.http.get<boolean>(this.generateTemplateForExcelDataSetUrl);
  }



  /**
   * Méthode qui charge le dataSet d'entrainement du modèle au format Csv.
   * Par défaut, le modèle Random Forest est utilisé sur le dataset de classification du type d'Iris.
   * @param file : fichier Csv contenant le jeu de données.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public importCsvTemplateDataSetFile(file: File): Promise<any> {
    // Création d'un objet FormData. Utilisé pour envoyer des données de formulaire (ex : fichiers) via une requête HTTP POST :
    const formData: FormData = new FormData();
    // Ajout du fichier à l'objet FormData :
    formData.append('file', file, file.name);
    return this.http.post<boolean>(this.loadCsvDataSetUrl, formData).toPromise();
  }



  /**
   * Méthode qui génère le fichier csv de chargement du dataSet d'entrainement.
   * Par défaut, le modèle Random Forest est utilisé sur le dataset de classification du type d'Iris.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public generateCsvFileTemplateForDataset(): Observable<boolean> {
    return this.http.get<boolean>(this.generateTemplateForCsvDataSetUrl);
  }





  /************************* Méthodes des Modèles de reconnaissances faciales (HOG & CNN) *************************/

  /**
   * Méthode pour charger un fichier .zip contenant les photos d'entrainement du modèle.
   * @param file : fichier .zip contenant le set d'image d'entrainement.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public async loadTrainingDataSetZip(file: File): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    console.log("Fichier d'images intégré : " +file);
    return this.http.post<boolean>(this.loadTrainingSetFileUrl, formData).toPromise();
  }



  /**
   * Méthode pour charger un fichier .zip contenant les photos de validation du modèle.
   * @param file : fichier .zip contenant le set d'image de validation.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public async loadValidationDataSetZip(file: File): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    console.log("Fichier d'images intégré : " +file);
    return this.http.post<boolean>(this.loadValidationSetFileUrl, formData).toPromise();
  }



  /**
   * Méthode pour charger une photo à identifier.
   * @param file : fichier .zip qui contient l'image à identifier.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public async loadFaceIdentifyFile(file: File): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    console.log("Fichier de l'image à reconnaitre : " +file);
    return this.http.post<boolean>(this.loadIdentifyFaceFileUrl, formData).toPromise();
  }



  /**
   * Méthode pour encoder les photos et entrainer le modèle.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public async trainFaceRecognizerModel(): Promise<any> {
    try {
      const response= await this.http.get<string>(this.recognizeFaceTrainingUrl).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui teste le modèle.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public async validateFaceRecognizerModel(): Promise<any> {
    try {
      const response= await this.http.get<string>(this.recognizeFaceValidationUrl).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui exécute le modèle pour identifier un visage.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public async executeFaceRecognizerModel(): Promise<any> {
    try {
      const response= await this.http.get<string>(this.useRecognizeFaceModelUrl).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui initialise le modèle.
   * Le modèle de reconnaissance utilisé par défaut est le modèle "HOG".
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public async initializeFaceRecognizerModel(): Promise<any> {
    try {
      const response= await this.http.get<string>(this.initializeFaceRecognizerModelUrl).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui renvoie la liste des modèles (HOG, CNN).
   * @return List<String> : liste des modèles.
   *
   */
  public async getListModel(): Promise<any> {
    try {
      const response= await this.http.get<string>(this.getListModelUrl).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui sélectionne le modèle de machine learning.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public async selectModel(selectModel:string): Promise<any> {
    try {
      console.log("choix modèle SERVICE : "+selectModel);
      const response= await this.http.post<boolean>(this.selectModelUrl, selectModel).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }





  /*********************** Méthodes du modèle GAN (Génération d'images) ***********************/

  /**
   * Méthode pour charger le fichier de paramètres du modèle GAN.
   * Ce fichier est généré lors de l'entrainement du modèle.
   * @param file : fichier .pkl contenant les paramètres du modèle.
   * @return booléen : succès/échec de l'exécution.
   *
   */
  public async loadParametersGenFile(file: File): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    console.log(file);
    return this.http.post<boolean>(this.loadParametersGenFileUrl, formData).toPromise();
  }



  /**
   * Méthode qui exécute le modèle GAN pour générer des images.
   * @return boolean : Opération réussie ou non.
   *
   */
  public async generateImage(): Promise<any> {
    try {
      const response= await this.http.get<boolean>(this.generateGANImageUrl).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode pour entrainer le modèle GAN.
   * @param n_epochs : nombre d'itération sur l'ensemble du jeu de test.
   * @param batch_size : taille des lots d'images.
   * @param lr : taux d'apprentissage.
   * @param z_dim : dimensions de l'Espace Latent.
   * @param device : hardware utilisé.
   * @param show_step : étapes affichées.
   * @param save_step : étapes sauvegardées.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public async trainGANModel(n_epochs : number, batch_size : number, lr : number, z_dim : number, device : string, show_step : number, save_step:number): Promise<any> {
    try {
      // Création de l'url :
      const url = `${this.trainGANModelUrl}?nbEpochs=${n_epochs}&batchSize=${batch_size}&lr=${lr}&zDim=${z_dim}&device=${device}&showStep=${show_step}&saveStep=${save_step}`;
      // Exécution du Backend :
      const response = await this.http.post<boolean>(url, {}).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }





  /*********************** Méthodes du modèle d'Embedding ***********************/

  /**
   * Méthode qui génère le fichier Jsonl pour charger le DataSet dans la BDD Vectorielle.
   * Par défaut, le DataSet utilisé est celui du Camélia Yvon Jézéquel.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public generateJsonlFileTemplateForDataset(): Observable<boolean> {
    return this.http.get<boolean>(this.generateTemplateForJsonlDataSetUrl);
  }



  /**
   * Méthode pour charger un fichier .jsonl contenant les données chargées dans la BDD Vectorielle.
   * @param file : fichier .jsonl contenant les données de la BDD Vectorielle.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public async importJsonlTemplateDataSetFile(file: File): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    console.log("Fichier d'images intégré : " +file);
    return this.http.post<boolean>(this.loadDataFileUrl, formData).toPromise();
  }



  /**
   * Méthode qui charge le dataset dans la BDD Vectorielle à partir du fichier .jsonl.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public async loadFileIntoDataset(): Promise<any> {
    try {
      const response= await this.http.get<boolean>(this.initializeDataSetUrl).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui renvoie la liste des modèles (HOG, CNN).
   * @return List<String> : liste des modèles.
   *
   */
  public async getListCategories(): Promise<any> {
    try {
      const response= await this.http.get<string>(this.getCategoriesListUrl).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui sélectionne le modèle de machine learning.
   * @return boolean : succès/échec de l'exécution.
   *
   */
  public async selectCategory(selectCategory:string): Promise<any> {
    try {
      console.log("choix modèle SERVICE : "+selectCategory);
      const response= await this.http.post<boolean>(this.selectCategoryUrl, selectCategory).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui interroge le Llm au sujet du dataSet chargé dans la BDD Vectorielle.
   * @param string : question posée au Llm.
   * @return string : réponse fournie par le Llm.
   *
   */
  public async getLlmEmbeddingAnswer(question:string): Promise<any> {
    try {
      // Exécution du Backend :
      console.log("QUESTION : " + question);
      // console.log("TEST URL : " + this.generateEmbeddingAnswerUrl + question);
      // const url = `${this.generateEmbeddingAnswerUrl}${question}`;
      const response = await this.http.post<boolean>(this.generateEmbeddingAnswerUrl, question).toPromise();
      console.log(response);
      return response;
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }






}

