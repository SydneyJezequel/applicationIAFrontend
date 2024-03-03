import { Component, OnInit } from '@angular/core';
import { Ville } from "../../../model/ville.model";
import { VilleService } from "../../../_services/ville.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";






/******************************* Controller d'Edition d'une Ville *******************************/
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
    this.villeService.getVilleById(no_ville);
    this.getVilleById(no_ville);
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode d'exécution du Formulaire.
   */
  onEditVille(){
    this.villeService.createVille(this.editVille);
    // Redirection :
    this.router.navigate(['villes']);
  }



  /**
   * Méthode qui récupère une ville.
   * @param no_ville : id de la ville récupérée.
   *
   */
  getVilleById(no_ville : number){
    console.log(" numéro de personne : " + no_ville);
    this.villeService.getVilleById(no_ville).subscribe(
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

