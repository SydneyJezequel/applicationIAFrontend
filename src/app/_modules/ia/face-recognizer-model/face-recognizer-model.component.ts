import { Component, OnInit } from '@angular/core';
import { IaService } from "../../../_services/ia.service";
import { Router } from "@angular/router";






/************************** Controller qui manipule le Modèle de Reconnaissance Faciale **************************/
@Component({
  selector: 'app-face-recognizer-model',
  templateUrl: './face-recognizer-model.component.html',
  styleUrls: ['./face-recognizer-model.component.scss']
})
export class FaceRecognizerModelComponent implements OnInit {





  /******************************* Attributs *******************************/

  // Messages à charger - Chargement du DataSet d'entrainement & la Validation du modèle :
  public successLoading : string = "Set d'images chargé avec succès.";
  public errorLoading : string = "Erreur lors du chargement du Set d'images : Attention à bien charger un fichier .zip contenant des images au format Jpeg / Jpg.";

  // Messages de retour - Chargement du DataSet d'entrainement :
  public reponseLoadTrainingDataSet !: boolean;
  public loadTrainingDataSetResultSuccess !: string;
  public loadTrainingDataSetResultError !: string;

  // Messages de retour - Validation du modèle :
  public reponseLoadValidationDataSet !: boolean;
  public loadValidationDataSetResultSuccess !: string;
  public loadValidationDataSetResultError !: string;

  // Messages de retour - Entrainement du Modèle :
  public reponseTrainingModel !: boolean;
  public successTraining : string = "Modèle entrainé avec succès.";
  public errorTraining : string = "Erreur de  l'entrainement du modèle.";
  public successTrainingDataSet !: string;
  public errorTrainingDataSet !: string;

  // Messages de retour - Valider le Modèle :
  public reponseValidationModel !: boolean;
  public successValidation : string = "Modèle testé avec succès.";
  public errorValidation : string = "Erreur du test du modèle. Avez-vous bien entrainé le modèle auparavant ?";
  public successValidationModel !: string;
  public errorValidationModel !: string;

  // Messages de retour - Chargement de l'image à identifier :
  public reponseLoadFaceIdentify !: boolean;
  public identifyLoadSuccess : string = "Chargement de la photo à identifier terminée.";
  public identifyLoadError : string = "Erreur lors du chargement de la photo à identifier.";
  public successLoadFaceIdentify !: string;
  public errorLoadFaceIdentify !: string;

  // Messages de retour - Identification d'un visage :
  public reponseFaceIdentify !: boolean;
  public identifySuccess : string = "Identification du visage terminée.";
  public identifyError : string = "Erreur lors de l'identification du visage.";
  public successFaceIdentify !: string;
  public errorFaceIdentify !: string;

  // Fichier zip de photos d'entrainement :
  private selectedTrainingSetFile: File | null = null;
  // Fichier zip de photos de validation :
  private selectedValidationSetFile: File | null = null;
  // Fichier de la photo à identifier :
  private faceIdentifyFile : File | null = null;

  // Liste des modèles :
  modelList !: string[];
  selectedModel !: string;

  // Messages de retour - Identification d'un visage :
  public reponseSelectModel !: boolean;
  public selectModelSuccess : string = "Modèle sélectionné.";
  public selectModelError : string = "Erreur lors de la sélection du modèle.";
  public successSelectModel !: string;
  public errorSelectModel !: string;





  /******************************* Constructeur *******************************/
  constructor(private iaService : IaService, private router: Router) { }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
    this.initializeFaceRecognizerModel();
    this.getListModel();
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui intègre les fichiers image sous forme Zip
   * dans le modèle de Machine Learning FaceRecognizer.
   * @return boolean
   *
   */
  public onTrainingSetFileSelected(event: any): void {
    this.selectedTrainingSetFile = event.target.files[0] as File;
  }



  /**
   * Méthode pour charger un fichier .zip contenant les photos d'entrainement du modèle.
   *
   */
  public async loadTrainingDataSetZip(): Promise<void> {
    if (this.selectedTrainingSetFile) {
      try {
        this.reponseLoadTrainingDataSet = await this.iaService.loadTrainingDataSetZip(this.selectedTrainingSetFile);
        console.log(this.reponseLoadTrainingDataSet);
        if (this.reponseLoadTrainingDataSet) {
          this.loadTrainingDataSetResultSuccess = this.successLoading;
        } else {
          this.loadTrainingDataSetResultError = this.errorLoading;
        }
      } catch (error) {
        console.error('Erreur : ', error);
      }

    }
  }



  /**
   * Méthode qui intègre les fichiers image sous forme Zip
   * dans le modèle de Machine Learning FaceRecognizer.
   * @return boolean
   *
   */
  public onValidationSetFileSelected(event: any): void {
    this.selectedValidationSetFile = event.target.files[0] as File;
  }



  /**
   * Méthode pour charger un fichier .zip contenant les photos de validation du modèle.
   *
   */
  public async loadValidationDataSetZip(): Promise<void> {
    if (this.selectedValidationSetFile) {
      try {
        this.reponseLoadValidationDataSet = await this.iaService.loadValidationDataSetZip(this.selectedValidationSetFile);
        console.log(this.reponseLoadValidationDataSet);
        if (this.reponseLoadValidationDataSet) {
          this.loadValidationDataSetResultSuccess = this.successLoading;
        } else {
          this.loadValidationDataSetResultError = this.errorLoading;
        }
      } catch (error) {
        console.error('Erreur : ', error);
      }

    }
  }



  /**
   * Méthode qui intègre les fichiers image sous forme Zip
   * dans le modèle de Machine Learning FaceRecognizer.
   * @return boolean
   *
   */
  public onFaceIdentifyFileSelected(event: any): void {
    this.faceIdentifyFile = event.target.files[0] as File;
  }



  /**
   * Méthode pour charger une photo à identifier.
   *
   */
  public async loadFaceIdentifyFile(): Promise<void> {
    if (this.faceIdentifyFile) {
      try {
        this.reponseLoadFaceIdentify = await this.iaService.loadFaceIdentifyFile(this.faceIdentifyFile);
        if (this.reponseLoadFaceIdentify) {
          this.successLoadFaceIdentify = this.identifyLoadSuccess;
        } else {
          this.errorLoadFaceIdentify = this.identifyLoadError;
        }
      } catch (error) {
        console.error('Erreur : ', error);
      }

    }
  }



  /**
   * Méthode pour encoder les photos et entrainer le modèle.
   *
   */
  public async trainFaceRecognizerModel() {
    // Exécution de la requête :
    try {
      this.reponseTrainingModel = await this.iaService.trainFaceRecognizerModel();
      if (this.reponseTrainingModel) {
        this.successTrainingDataSet = this.successTraining;
      } else {
        this.errorTrainingDataSet = this.errorTraining;
      }
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui teste le modèle.
   *
   */
  public async validateFaceRecognizerModel() {
    try {
      this.reponseValidationModel = await this.iaService.validateFaceRecognizerModel();
      if (this.reponseValidationModel) {
        this.successValidationModel = this.successValidation;
      } else {
        this.errorValidationModel = this.errorValidation;
      }
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui exécute le modèle pour identifier un visage.
   *
   */
  public async executeFaceRecognizerModel(): Promise<any>{
    try {
      this.reponseFaceIdentify = await this.iaService.executeFaceRecognizerModel();
        console.log(this.reponseFaceIdentify);
      if (this.reponseFaceIdentify) {
        this.successFaceIdentify = this.identifySuccess
      } else {
        this.errorFaceIdentify = this.identifyError;
      }
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui initialise le modèle.
   * Le modèle de reconnaissance utilisé par défaut est le modèle "HOG".
   *
   */
  public async initializeFaceRecognizerModel(): Promise<any>{
    try {
      let modeleInitialize = await this.iaService.initializeFaceRecognizerModel();
      console.log("modele initialisé : "+ modeleInitialize);
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui renvoie la liste des modèles (HOG, CNN).
   *
   */
  public async getListModel(): Promise<any>{
    try {
      this.modelList = await this.iaService.getListModel();
      console.log("liste des modèles : "+ this.modelList);
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui sélectionne le modèle de machine learning.
   *
   */
  public async selectModel(): Promise<any>{
    try {
      console.log("choix modèle CONTROLLER : "+this.selectedModel);
      this.reponseSelectModel = await this.iaService.selectModel(this.selectedModel);
      if (this.reponseSelectModel) {
          this.successSelectModel = this.selectModelSuccess;
        } else {
          this.errorSelectModel = this.selectModelError;
        }
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }






}

