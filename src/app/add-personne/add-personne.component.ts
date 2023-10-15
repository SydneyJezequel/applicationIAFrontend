import { Component, OnInit } from '@angular/core';
import {PersonneServiceService} from "../personne-service.service";
import {Personne} from "../model/personne.model";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";






/******************************* Fonctionnalité d'Ajout d'une Personne *******************************/

@Component({
  selector: 'app-add-personne',
  templateUrl: './add-personne.component.html',
  styleUrls: ['./add-personne.component.scss']
})
export class AddPersonneComponent implements OnInit {







  /******************************* Attributs *******************************/
  addPerson: Personne = new Personne();





  /******************************* Constructeur *******************************/
  constructor(private personneService : PersonneServiceService, private router: Router) { }







  /******************************* Initialisation *******************************/
  ngOnInit(): void {
  }






  /******************************* Méthodes *******************************/


  /**
   * Méthode d'exécution du Formulaire.
   */
  onSubmitPersonne(){
    this.newPerson(this.addPerson);
  }



  /**
   * Méthode d'ajout d'une Personne.
   * Cette méthode appelle le service pour créer une Personne.
   * @param personne
   */
  public newPerson(personne : Personne){
      const datePipe = new DatePipe('en-US'); // Conversion de la date en format Java.
      const formattedDate = datePipe.transform(this.addPerson.date_naissance, 'yyyy-MM-dd');
      if(formattedDate !== null){ // Controle de la date formatée.
        this.addPerson.date_naissance = new Date(formattedDate);
        this.personneService.addPerson(this.addPerson);
      }
      this.router.navigate(['personnes']); // Redirection
  }




}

