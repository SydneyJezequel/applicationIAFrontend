import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Ville } from "../model/ville.model";
import { Email } from "../model/email.model";




/******************************* Service qui gère les Email *******************************/
@Injectable({
  providedIn: 'root'
})
export class EmailService {




/******************************* Urls *******************************/
  private sendingEmail : string = "/api/email/envoyer-email";




/******************************* Constructeur *******************************/
  constructor(private http : HttpClient) { }




/******************************* Méthodes controlleur *******************************/

  /**
   * Méthode qui fait suivre les mails au Backend pour envoi.
   *
   */
  public async sendEmailemail(email : Email): Promise<void> {
    try {
      const response = await this.http.post<Ville>(this.sendingEmail, email).toPromise();
      console.log(response);
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }




}
