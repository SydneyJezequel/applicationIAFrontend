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
  /*
  public addPerson: any = {
    nom: '',
    prenom: '',
    date_naissance: '',
    no_securite_sociale: ''
  };
  */
  addPerson: Personne = new Personne()





  /******************************* Constructeur *******************************/
  constructor(private personneService : PersonneServiceService, private router: Router) { }







  /******************************* Initialisation *******************************/
  ngOnInit(): void {
  }






  /******************************* Méthodes controlleur *******************************/
  onSubmitPersonne(){
    this.newPerson(this.addPerson);
  }





    public newPerson(personne : Personne){
      const datePipe = new DatePipe('en-US');
      const formattedDate = datePipe.transform(this.addPerson.date_naissance, 'yyyy-MM-dd');
      this.addPerson.date_naissance = new Date("01-02-2022");
      console.log(this.addPerson.date_naissance);
      console.log(typeof this.addPerson.date_naissance);
      this.personneService.addPerson(this.addPerson);
      this.router.navigate(['personnes']);
  }




}
