import { Component, OnInit } from '@angular/core';
import {IaService} from "../../../_services/ia.service";






/************************** Controller qui manipule le Llm **************************/
@Component({
  selector: 'app-llm-model',
  templateUrl: './llm-model.component.html',
  styleUrls: ['./llm-model.component.scss']
})
export class LlmModelComponent implements OnInit {





  /******************************* Attributs *******************************/





  /******************************* Constructeur *******************************/
  constructor(private iaService : IaService) { }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui exécute le Fine-Tuning du Llm.
   *
   */



  /**
   * Méthode qui interroge le Llm et obtiens une réponse.
   *
   */






}

