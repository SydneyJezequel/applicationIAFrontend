import { Component, OnInit } from '@angular/core';
import { EmailService } from "../_services/email.service";
import { Email } from "../model/email.model";






/*********************** Controller gérant le Formulaire de contact ***********************/
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {





  /******************************* Attributs *******************************/

  email: Email = new Email();
  user!: string;
  message!: string;





  /******************************* Constructeur *******************************/
  constructor(private emailService : EmailService) {
    this.emailService = emailService;
  }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
  }





  /******************************* Méthodes *******************************/
  public onSubmit(): void {
    // Chargement des données :
    this.email.user = this.user;
    this.email.message = this.message;
    // Envoi de l'Email au serveur :
    this.emailService.sendEmail(this.email);
  }






}

