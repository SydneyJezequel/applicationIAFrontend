import { Component, OnInit } from '@angular/core';
import { IaService } from "../../../_services/ia.service";




/******************************* Fonctionnalité qui Communique avec chatGpt *******************************/
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
   * Méthode qui envoie des requêtes à chatGpt et renvoie
   * ses réponses.
   *
   */
   public async sendMessage(){
    console.log("sendMessage appelée");
    try {
      this.reponse = await this.iaService.sendMessage(this.request);
      console.log("Résultat" + this.reponse);
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }




}

