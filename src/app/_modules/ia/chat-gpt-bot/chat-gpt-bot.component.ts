import { Component, OnInit } from '@angular/core';
import { IaService } from "../../../_services/ia.service";






/******************************* Controller qui gère les échanges avec chatGpt *******************************/
@Component({
  selector: 'app-chat-gpt-bot',
  templateUrl: './chat-gpt-bot.component.html',
  styleUrls: ['./chat-gpt-bot.component.scss']
})
export class ChatGptBotComponent implements OnInit {





  /******************************* Attributs *******************************/

  public request : string = "";
  public reponse !: any;





  /******************************* Constructeur *******************************/
  constructor(private iaService : IaService) { }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui envoie le prompt à l'Api de chatGpt et renvoie sa réponse.
   * @return response : réponse.
   *
   */
   public async chat(){
    console.log("sendMessage appelée");
    try {
      this.reponse = await this.iaService.chat(this.request);
      console.log("Résultat" + this.reponse);
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }






}

