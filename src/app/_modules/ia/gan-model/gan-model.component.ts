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

  // Champs du formulaire d'entrainement :
  public n_epochs !: number;
  public batch_size !: number;
  public lr !: number;
  public z_dim !: number;
  public device !: string
  public show_step !: number;
  public save_step !: number;



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
      console.log("*********** TEST ***********")
      console.log(this.n_epochs)
      console.log(this.batch_size)
      console.log(this.lr)
      console.log(this.z_dim)
      console.log(this.device)
      console.log(this.show_step)
      console.log(this.save_step)
      console.log("*********** TEST ***********")
      this.reponseTrainingGANModel = await this.iaService.trainGANModel(this.n_epochs, this.batch_size, this.lr, this.z_dim, this.device, this.show_step , this.save_step);
      // this.reponseTrainingGANModel = await this.iaService.trainGANModel();
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

