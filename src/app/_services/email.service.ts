import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { City } from "../model/city.model";
import { Email } from "../model/email.model";






/******************************* Service qui gère les Emails *******************************/
@Injectable({
  providedIn: 'root'
})
export class EmailService {





  /******************************* Urls *******************************/

  private sendingEmail : string = "/api/email/envoyer-email";





  /******************************* Constructeur *******************************/
  constructor(private http : HttpClient) { }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui envoie les emails.
   *
   */
  public async sendEmail(email : Email): Promise<void> {
    try {
      const response = await this.http.post<City>(this.sendingEmail, email).toPromise();
      console.log(response);
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }






}

