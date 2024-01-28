import { Component, OnInit } from '@angular/core';
import {IaService} from "../../../_services/ia.service";





/************************** Fonctionnalité qui manipule le Modèle de Génération d'images GAN **************************/
@Component({
  selector: 'app-gan-model',
  templateUrl: './gan-model.component.html',
  styleUrls: ['./gan-model.component.scss']
})
export class GanModelComponent implements OnInit {






  /******************************* Attributs *******************************/

  // Messages de retour - Identification d'un visage :
  public reponseImageGeneration !: boolean;
  public generationSuccess : string = "Génération d'images terminées.";
  public generationError : string = "Erreur lors de la génération d'images.";
  public successGeneration !: string;
  public errorGeneration !: string;

  // Messages de retour - Identification d'un visage :
  public reponseTrainingGANModel !: boolean;
  public trainingSuccess : string = "Entrainement du modèle terminé avec succès.";
  public trainingError : string = "Erreur lors de l'entrainement du modèle'.";
  public successTraining !: string;
  public errorTraining !: string;






  /******************************* Constructeur *******************************/
  constructor(private iaService : IaService) { }






  /******************************* Initialisation *******************************/
  ngOnInit(): void {
  }






  /******************************* Méthodes *******************************/

  /**
   * Méthode qui utilise le modèle pour
   * générer des images.
   *
   */
  public async generateImage(): Promise<any>{
    try {
      this.reponseImageGeneration = await this.iaService.generateImage();
      console.log(this.reponseImageGeneration);
      if (this.reponseImageGeneration) {
        this.successGeneration = this.generationSuccess;
      } else {
        this.errorGeneration = this.generationError;
      }
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui lance l'entrainement
   * du modèle GAN.
   *
   */
  public async trainGANModel(): Promise<any>{
    try {
      this.reponseTrainingGANModel = await this.iaService.trainGANModel();
      console.log(this.reponseTrainingGANModel);
      if (this.reponseTrainingGANModel) {
        this.successTraining = this.trainingSuccess;
      } else {
        this.errorTraining = this.trainingError;
      }
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }







}

