import { Component, OnInit } from '@angular/core';
import { IaService } from "../../../_services/ia.service";
import { Router } from "@angular/router";





/************************** Fonctionnalité qui manipule le Modèle de Reconnaissance Faciale **************************/
@Component({
  selector: 'app-face-recognizer-model',
  templateUrl: './face-recognizer-model.component.html',
  styleUrls: ['./face-recognizer-model.component.scss']
})
export class FaceRecognizerModelComponent implements OnInit {




  /******************************* Attributs *******************************/
  public reponseLoadTrainingDataSet !: boolean;
  public reponseLoadValidationDataSet !: boolean;
  public success : string = "Set d'images chargé avec succès";
  public error : string = "Erreur lors du chargement du Set d'images : Attention à bien charger un fichier .zip contenant des images au format Jpeg / Jpg.";
  public loadTrainingDataSetResultSuccess !: string;
  public loadTrainingDataSetResultError !: string;
  public loadValidationDataSetResultSuccess !: string;
  public loadValidationDataSetResultError !: string;
  public identifySuccess : string = "Chargement de l'image réussi";
  public identifyError : string = "Erreur lors du chargement de l'image : Attention à bien charger un fichier jpg ou jpeg.";
  public reponseFaceIdentify !: string;
  public reponseFaceIdentifyResultSuccess !: string;
  public reponseFaceIdentifyeResultError !: string;





  /******************************* Constructeur *******************************/
  constructor(private iaService : IaService, private router: Router) { }




  /******************************* Initialisation *******************************/
  ngOnInit(): void {
  }




  /******************************* Méthodes *******************************/



  /************************************** TEST : Intégration jeu d'entrainement **************************************/
  /************************************** TEST : Intégration jeu d'entrainement **************************************/
  /************************************** TEST : Intégration jeu d'entrainement **************************************/
  /************************************** TEST : Intégration jeu d'entrainement **************************************/
  /************************************** TEST : Intégration jeu d'entrainement **************************************/
  /************************************** TEST : Intégration jeu d'entrainement **************************************/

    // Fichier zip :
  private selectedTrainingSetFile: File | null = null;



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
   * Méthode qui intègre les fichiers image sous forme Zip
   * dans le modèle de Machine Learning FaceRecognizer.
   * @return boolean
   *
   */
  public async uploadTrainingSetFile(): Promise<void> {
    if (this.selectedTrainingSetFile) {
      try {
        this.reponseLoadTrainingDataSet = await this.iaService.processTrainingSetImageZip(this.selectedTrainingSetFile);
        if (this.reponseLoadTrainingDataSet) {
          this.loadTrainingDataSetResultSuccess = this.success;
        } else {
          this.loadTrainingDataSetResultError = this.error;
        }
      } catch (error) {
        console.error('Erreur : ', error);
      }

    }
  }
  /************************************** TEST : Intégration jeu d'entrainement **************************************/
  /************************************** TEST : Intégration jeu d'entrainement **************************************/
  /************************************** TEST : Intégration jeu d'entrainement **************************************/
  /************************************** TEST : Intégration jeu d'entrainement **************************************/
  /************************************** TEST : Intégration jeu d'entrainement **************************************/
  /************************************** TEST : Intégration jeu d'entrainement **************************************/




  /************************************** TEST : Intégration jeu de validation **************************************/
  /************************************** TEST : Intégration jeu de validation **************************************/
  /************************************** TEST : Intégration jeu de validation **************************************/
  /************************************** TEST : Intégration jeu de validation **************************************/
  /************************************** TEST : Intégration jeu de validation **************************************/
  /************************************** TEST : Intégration jeu de validation **************************************/


    // Fichier zip :
  private selectedValidationSetFile: File | null = null;



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
   * Méthode qui intègre les fichiers image sous forme Zip
   * dans le modèle de Machine Learning FaceRecognizer.
   * @return boolean
   *
   */
  public async uploadValidationSetFile(): Promise<void> {
    if (this.selectedValidationSetFile) {
      try {
        this.reponseLoadValidationDataSet = await this.iaService.processValidationSetImageZip(this.selectedValidationSetFile);
        if (this.reponseLoadValidationDataSet) {
          this.loadValidationDataSetResultSuccess = this.success;
        } else {
          this.loadValidationDataSetResultError = this.error;
        }
      } catch (error) {
        console.error('Erreur : ', error);
      }

    }
  }





  // Fichier zip :
  private faceIdentifyFile : File | null = null;

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
   * Méthode qui intègre les fichiers image
   * dans le modèle de Machine Learning FaceRecognizer.
   * @return boolean
   *
   */
  public async uploadFaceIdentify(): Promise<void> {
    if (this.faceIdentifyFile) {
      try {
        this.reponseFaceIdentify = await this.iaService.processFaceIdentify(this.faceIdentifyFile);
        if (this.reponseFaceIdentify) {
          this.reponseFaceIdentifyResultSuccess = this.identifySuccess;
        } else {
          this.reponseFaceIdentifyeResultError = this.identifyError;
        }
      } catch (error) {
        console.error('Erreur : ', error);
      }

    }
  }
  /************************************** TEST : Intégration jeu de validation **************************************/
  /************************************** TEST : Intégration jeu de validation **************************************/
  /************************************** TEST : Intégration jeu de validation **************************************/
  /************************************** TEST : Intégration jeu de validation **************************************/
  /************************************** TEST : Intégration jeu de validation **************************************/
  /************************************** TEST : Intégration jeu de validation **************************************/


  /************************************** TEST : Manipuler le modèle **************************************/
  /************************************** TEST : Manipuler le modèle **************************************/
  /************************************** TEST : Manipuler le modèle **************************************/
  /************************************** TEST : Manipuler le modèle **************************************/
  /************************************** TEST : Manipuler le modèle **************************************/
  /************************************** TEST : Manipuler le modèle **************************************/

  /**
   * Méthode qui encode les photos et entraine le modèle
   * avec les photos encodées.
   *
   */
  public async entrainerLeModele(){
    // Exécution de la requête :
    try {
      this.iaService.entrainerLeModele().then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui teste le modèle avec un set
   * de photos d'entrainement.
   *
   */
  public async validerLeModele(){
    let message : string = "ceci est un test";
    try {
      this.iaService.validerLeModele().then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.error('Erreur : ', error);
    }

  }



  /**
   * Méthode qui utilise le modèle pour
   * reconnaitre le visage d'une personne.
   *
   */
  public async faceIdentify(): Promise<any>{
    try {
      this.iaService.faceIdentify().then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }
  /************************************** TEST : Manipuler le modèle **************************************/
  /************************************** TEST : Manipuler le modèle **************************************/
  /************************************** TEST : Manipuler le modèle **************************************/
  /************************************** TEST : Manipuler le modèle **************************************/
  /************************************** TEST : Manipuler le modèle **************************************/
  /************************************** TEST : Manipuler le modèle **************************************/















































  /************************************** TEST : Modèle de Reconnaissance Faciale **************************************/
  /************************************** TEST : Modèle de Reconnaissance Faciale **************************************/
  /************************************** TEST : Modèle de Reconnaissance Faciale **************************************/
  /************************************** TEST : Modèle de Reconnaissance Faciale **************************************/
  /************************************** TEST : Modèle de Reconnaissance Faciale **************************************/
  /************************************** TEST : Modèle de Reconnaissance Faciale **************************************/
  /**
   * Méthode qui XXXXXXXXXXXXXXXXX
   *
   */
  public async test1(){
    // Exécution de la requête :
    try {
      this.iaService.test1().then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui XXXXXXXXXXXXXXXXX
   *
   */
  public async test3(){
    let message : string = "ceci est un test";
    try {
      this.iaService.test3(message).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.error('Erreur : ', error);
    }

  }
  /************************************** TEST : Modèle de Reconnaissance Faciale **************************************/
  /************************************** TEST : Modèle de Reconnaissance Faciale **************************************/
  /************************************** TEST : Modèle de Reconnaissance Faciale **************************************/
  /************************************** TEST : Modèle de Reconnaissance Faciale **************************************/
  /************************************** TEST : Modèle de Reconnaissance Faciale **************************************/
  /************************************** TEST : Modèle de Reconnaissance Faciale **************************************/





}

