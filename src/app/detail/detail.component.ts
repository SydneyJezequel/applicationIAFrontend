import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Personne} from "../model/personne.model";
import {PersonneServiceService} from "../personne-service.service";
import {ActivatedRoute, ParamMap} from '@angular/router';






/******************************* Fonctionnalité qui détaille une Personne *******************************/

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {






  /******************************* Attributs *******************************/
  public personneTrouve ?: Personne;






  /******************************* Constructeur *******************************/
  constructor(private personneService : PersonneServiceService,
              private route : ActivatedRoute) { }






  /******************************* Initialisation *******************************/
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('no_personne');
    let no_personne = id as unknown as number;
    this.personneService.findPersonne(no_personne);
    this.getOnePersonne(no_personne);

  }






  /******************************* Méthodes controlleur *******************************/
  getOnePersonne(no_personne : number){
    console.log(" numéro de personne : " + no_personne);
    this.personneService.findPersonne(no_personne).subscribe(
      (response) =>
      {
        this.personneTrouve = response;
        // Test :
        console.log(this.personneTrouve);
        console.log(this.personneTrouve.nom);
        console.log(this.personneTrouve.prenom);
        console.log(this.personneTrouve.no_personne);
        console.log(this.personneTrouve.date_naissance);
        console.log(this.personneTrouve.no_securite_sociale);
        // Test :
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }







}



