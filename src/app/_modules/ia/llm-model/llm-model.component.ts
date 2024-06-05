import { Component, OnInit } from '@angular/core';
import { IaService } from "../../../_services/ia.service";






/************************** Controller qui manipule le Llm **************************/
@Component({
  selector: 'app-llm-model',
  templateUrl: './llm-model.component.html',
  styleUrls: ['./llm-model.component.scss']
})
export class LlmModelComponent implements OnInit {





  /******************************* Attributs *******************************/

  // Champs du formulaire pour Fine Tuner le Modèle :
  public nbEpochs !: number;
  public trainDatasetSize !: number;
  public validationDatasetSize !: number;
  public trainBatchSize !: number;
  public evalBatchSize !: number;

  // Messages de retour - Fine Tuning du Llm :
  public reponseFineTuningLlm !: boolean | undefined;
  public fineTuningLlmSucceeded : string = "Le Fine Tuning du modèle s'est déroulé avec succès.";
  public fineTuningLlmFailed : string = "Le Fine Tuning du modèle a échoué.";
  public successFineTuningLlm !: string;
  public errorFineTuningLlm !: string;

  // Champs du formulaire pour interroger le modèle :
  public question !: string;
  public context !: string;

  // Messages de retour - Réponse du Llm :
  public llmAnswer !: string;
  public displayLlmAnswer !: string;





  /******************************* Constructeur *******************************/
  constructor(private iaService : IaService) { }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui exécute le Fine-Tuning du Llm.
   * Par défaut, le Dataset utilisé est le dataset "hotpot_qa".
   *
   */
  public async fineTuneModel(): Promise<any> {
    try{
      // Exécution de la requête :
      this.reponseFineTuningLlm = await this.iaService.fineTuneModel(this.nbEpochs, this.trainDatasetSize, this.validationDatasetSize, this.trainBatchSize, this.evalBatchSize);
      console.log(this.reponseFineTuningLlm);
      // Affichage des messages de succès ou d'erreur :
      if (this.reponseFineTuningLlm) {
        this.successFineTuningLlm = this.fineTuningLlmSucceeded;
      } else {
        this.errorFineTuningLlm = this.fineTuningLlmFailed;
      }
    } catch (error) {
       console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui interroge le Llm et obtient une réponse.
   *
   */
  public async getFineTunedLlmAnswer(): Promise<any>{
    try {
      console.log(this.question)
      console.log(this.context)
      this.llmAnswer = await this.iaService.getFineTunedLlmAnswer(this.question, this.context);
      console.log(this.llmAnswer);
      if (this.llmAnswer) {
        this.displayLlmAnswer = this.llmAnswer;
      }
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }





}

