import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { City } from "../../../model/city.model";
import { CityService } from "../../../_services/city.service";






/******************************* Controller qui affiche le détail d'une Ville *******************************/
@Component({
  selector: 'app-detail-list-city',
  templateUrl: './detail-city.component.html',
  styleUrls: ['./detail-city.component.scss']
})
export class DetailCityComponent implements OnInit {





  /******************************* Attributs *******************************/

  public foundCity ?: City;





  /******************************* Constructeur *******************************/
  constructor(private cityService : CityService,
              private route : ActivatedRoute) { }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('no_city');
    let no_city = id as unknown as number;
    this.cityService.getCityById(no_city)
    this.getOneCity(no_city);

  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui récupère une Ville.
   * @param no_city : id de la ville récupérée.
   *
   */
  public getOneCity(no_city : number): void {
    console.log(" numéro de list-city : " + no_city);
    this.cityService.getCityById(no_city).subscribe(
      (response) =>
      {
        this.foundCity = response;
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }






}

