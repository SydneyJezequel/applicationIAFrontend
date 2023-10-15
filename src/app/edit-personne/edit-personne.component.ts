import { Component, OnInit } from '@angular/core';
import {PersonneServiceService} from "../personne-service.service";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Personne} from "../model/personne.model";
import {Router} from "@angular/router";







/******************************* Fonctionnalité d'Edition d'une Personne *******************************/

@Component({
  selector: 'app-edit-personne',
  templateUrl: './edit-personne.component.html',
  styleUrls: ['./edit-personne.component.scss']
})
export class EditPersonneComponent implements OnInit {







  /******************************* Attributs *******************************/

  public numero !: number;
  public editPerson !: Personne;






  /******************************* Constructeur *******************************/

  constructor(private route: ActivatedRoute, private personneService : PersonneServiceService, private router: Router) { }









  /******************************* Initialisation *******************************/

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.numero = params['no_personne'];
      this.personneService.findPersonne(this.numero).subscribe(
        (response) =>
        {
          this.editPerson = response;
          // Test :
          console.log(this.editPerson);
          console.log(this.editPerson.nom);
          console.log(this.editPerson.prenom);
          console.log(this.editPerson.no_personne);
          console.log(this.editPerson.date_naissance);
          console.log(this.editPerson.no_securite_sociale);
          // Test :
        }),
        (error:HttpErrorResponse) =>
        {
          alert(error.message);
        }
    })
  }








  /******************************* Méthodes controlleur *******************************/

  onEditPersonne(){
    console.log("personne ajoutée : " + this.editPerson.prenom +" "+ this.editPerson.nom + " "+this.editPerson.date_naissance+ " "+this.editPerson.no_securite_sociale);
    this.personneService.addPerson(this.editPerson);
    this.router.navigate(['personnes']);
  }








}



