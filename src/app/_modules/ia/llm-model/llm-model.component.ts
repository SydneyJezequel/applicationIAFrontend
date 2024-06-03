import { Component, OnInit } from '@angular/core';
import { IaService } from "../../../_services/ia.service";
import { HttpErrorResponse } from "@angular/common/http";






/************************** Controller qui manipule le Llm **************************/
@Component({
  selector: 'app-llm-model',
  templateUrl: './llm-model.component.html',
  styleUrls: ['./llm-model.component.scss']
})
export class LlmModelComponent implements OnInit {





  /******************************* Attributs *******************************/

  // Messages de retour - Fine Tuning du Llm :
  public reponseFineTuningLlm !: boolean;
  public fineTuningLlmSucceeded : string = "Le Fine Tuning du modèle s'est déroulé avec succès.";
  public fineTuningLlmFailed : string = "Le Fine Tuning du modèle a échoué.";
  public successFineTuningLlm !: string;
  public errorFineTuningLlm !: string;

  // Champs du formulaire contenant la question :
  public question !: string;

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
  public async fineTuneModel(): Promise<void> {
    // Exécution de la requête :
    this.iaService.fineTuneModel().subscribe(
      (response: boolean) => {
        this.reponseFineTuningLlm = response;
        console.log(this.reponseFineTuningLlm);
        // Affichage des messages de succès ou d'erreur :
        if (this.reponseFineTuningLlm) {
          this.successFineTuningLlm = this.fineTuningLlmSucceeded;
        } else {
          this.errorFineTuningLlm = this.fineTuningLlmFailed;
        }
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }



  /**
   * Méthode qui interroge le Llm et obtient une réponse.
   *
   */
  public async getFineTunedLlmAnswer(): Promise<any>{
    try {
      console.log(this.question)
      this.llmAnswer = await this.iaService.getFineTunedLlmAnswer(this.question);
      console.log(this.llmAnswer);
      if (this.llmAnswer) {
        this.displayLlmAnswer = this.llmAnswer;
      }
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }





}

