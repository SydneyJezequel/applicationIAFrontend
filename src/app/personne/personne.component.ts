import { Component, OnInit } from '@angular/core';
import {PersonneServiceService} from "../personne-service.service";
import {Personne} from "../model/personne.model";
import {HttpErrorResponse} from "@angular/common/http";







/******************************* Fonctionnalité qui liste les Personnes *******************************/

@Component({
  selector: 'app-personne',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.scss']
})

export class PersonneComponent implements OnInit {






  /******************************* Attributs *******************************/
  public personne !: Personne;
  public personnes !: Personne[];
  public personneTrouve !: Personne;
  public no_personne !: number;






  /******************************* Constructeur *******************************/
  constructor(private personneService : PersonneServiceService) {
    this.no_personne = 1;
  }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
    this.getAll();
  }






  /******************************* Méthodes controlleur *******************************/
  public getAll():void
  {
    this.personneService.getAllPersonne().subscribe(
      (response: Personne[]) =>
      {
        this.personnes = response;
        // Test :
        console.log(this.personnes);
        // Test :
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }



  delete(no_personne : number){
      this.personneService.delete(no_personne);
      window.location.reload();
  }





}



