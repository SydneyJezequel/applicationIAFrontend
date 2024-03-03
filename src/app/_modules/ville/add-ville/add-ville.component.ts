import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Ville } from "../../../model/ville.model";
import { VilleService } from "../../../_services/ville.service";






/******************************* Controller d'Ajout d'une Ville *******************************/
@Component({
  selector: 'app-add-list-ville',
  templateUrl: './add-ville.component.html',
  styleUrls: ['./add-ville.component.scss']
})
export class AddVilleComponent implements OnInit {





  /******************************* Attributs *******************************/

  public addVille: Ville = new Ville();





  /******************************* Constructeur *******************************/
  constructor(private villeService : VilleService, private router: Router) { }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {

  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode d'exécution du Formulaire : Ajout d'une ville.
   */
  onAddVille(){
    console.log(this.addVille);
    this.villeService.createVille(this.addVille);
    // Redirection :
    this.router.navigate(['villes']);
  }






}

