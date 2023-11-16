import { Component, OnInit } from '@angular/core';
import { Ville } from "../../../model/ville.model";
import { VilleService } from "../../../_services/ville.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";




/******************************* Fonctionnalité d'Edition d'une Ville *******************************/
@Component({
  selector: 'app-edit-list-ville',
  templateUrl: './edit-ville.component.html',
  styleUrls: ['./edit-ville.component.scss']
})
export class EditVilleComponent implements OnInit {




/******************************* Attributs *******************************/
  public editVille !: Ville;




/******************************* Constructeur *******************************/
  constructor(private villeService : VilleService,
              private route : ActivatedRoute, private router: Router) { }




/******************************* Initialisation *******************************/
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('no_ville');
    let no_ville = id as unknown as number;
    this.villeService.findVille(no_ville);
    this.getOneVille(no_ville);
  }




/******************************* Méthodes *******************************/

  /**
   * Méthode d'exécution du Formulaire.
   */
  onEditVille(){
    this.villeService.addVille(this.editVille);
    this.router.navigate(['villes']);     // Redirection
  }



  /**
   * Méthode qui renvoie une personne en fonction de son Id.
   * @param no_personne
   */
  getOneVille(no_ville : number){
    console.log(" numéro de personne : " + no_ville);
    this.villeService.findVille(no_ville).subscribe(
      (response) =>
      {
        this.editVille = response;
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }





}

