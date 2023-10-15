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
/*
REMARQUE :
  Route est utilisé pour configurer les routes dans l'application,
  tandis que ActivatedRoute est utilisé
  pour extraire des informations spécifiques à partir de la route
  active dans un composant.
*/






  /******************************* Initialisation *******************************/

  ngOnInit(): void {
    // Récupération de la Personne en fonction de l'Id de la Personne passé dans l'url :
    this.route.params.subscribe( params => {
      this.numero = params['no_personne'];
      this.personneService.findPersonne(this.numero).subscribe(
        (response) =>
        {
          this.editPerson = response;
        }),
        (error:HttpErrorResponse) =>
        {
          alert(error.message);
        }
    })
  }








  /******************************* Méthodes *******************************/

  /**
   * Méthode édite une Personne.
   * Cette méthode appelle le service pour éditer une Personne.
   * @param personne
   */
  onEditPersonne(){
    this.personneService.addPerson(this.editPerson);
    this.router.navigate(['personnes']);     // Redirection
  }








}



