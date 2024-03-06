import { Component, OnInit } from '@angular/core';
import { City } from "../../../model/city.model";
import { CityService } from "../../../_services/city.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";






/******************************* Controller d'Edition d'une Ville *******************************/
@Component({
  selector: 'app-edit-list-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.scss']
})
export class EditCityComponent implements OnInit {





  /******************************* Attributs *******************************/

  public editCity !: City;





  /******************************* Constructeur *******************************/
  constructor(private cityService : CityService,
              private route : ActivatedRoute, private router: Router) { }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('no_city');
    let no_city = id as unknown as number;
    this.cityService.getCityById(no_city);
    this.getCityById(no_city);
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode d'exécution du formulaire d'édition d'une ville.
   *
   */
  public onEditCity(): void {
    this.cityService.createCity(this.editCity);
    // Redirection :
    this.router.navigate(['cities']);
  }



  /**
   * Méthode qui récupère une Ville.
   * @param no_city : id de la ville récupérée.
   *
   */
  public getCityById(no_city : number): void {
    console.log(" numéro ville : " + no_city);
    this.cityService.getCityById(no_city).subscribe(
      (response) =>
      {
        this.editCity = response;
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }






}

