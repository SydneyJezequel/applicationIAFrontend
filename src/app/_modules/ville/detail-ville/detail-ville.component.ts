import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Ville } from "../../../model/ville.model";
import { VilleService } from "../../../_services/ville.service";




/******************************* Fonctionnalité qui détaille une Ville *******************************/
@Component({
  selector: 'app-detail-list-ville',
  templateUrl: './detail-ville.component.html',
  styleUrls: ['./detail-ville.component.scss']
})
export class DetailVilleComponent implements OnInit {




/******************************* Attributs *******************************/
  public villeTrouve ?: Ville;




/******************************* Constructeur *******************************/
  constructor(private villeService : VilleService,
              private route : ActivatedRoute) { }




/******************************* Initialisation *******************************/
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('no_ville');
    let no_ville = id as unknown as number;
    this.villeService.findVille(no_ville)
    this.getOneVille(no_ville);

  }




/******************************* Méthodes *******************************/


  /**
   * Méthode qui renvoie une ville en fonction de son Id.
   * @param no_ville
   */
  getOneVille(no_ville : number){
    console.log(" numéro de list-ville : " + no_ville);
    this.villeService.findVille(no_ville).subscribe(
      (response) =>
      {
        this.villeTrouve = response;
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }





}

