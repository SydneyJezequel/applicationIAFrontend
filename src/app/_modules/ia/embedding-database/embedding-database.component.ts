import { Component, OnInit } from '@angular/core';
import {IaService} from "../../../_services/ia.service";
import {HttpErrorResponse} from "@angular/common/http";






/************************** Controller qui manipule le Modèle d'Embedding **************************/
@Component({
  selector: 'app-embedding-database',
  templateUrl: './embedding-database.component.html',
  styleUrls: ['./embedding-database.component.scss']
})
export class EmbeddingDatabaseComponent implements OnInit {





  /******************************* Attributs *******************************/

  // Messages de retour - Génértion du fichier pour charger le DataSet :
  public generationJsonlFile !: boolean;
  public successGenerationJsonl : string = "Fichier pour charger le dataset généré avec succès.";
  public errorFileGenerationJsonl : string = "Erreur lors de la génération du fichier pour charer le dataset.";
  public displaySuccessMessageJsonl !: string;
  public displayErrorMessageJsonl !: string;

  // Fichier .jsonl contenant le DataSet chargé dans la BDD Vectorielle :
  private selectedDataSetFile: File | null = null;

  // Messages de retour - Chargement du Fichier contenant le DataSet :
  public reponseLoadingDataSetFile !: boolean;
  public successLoadingFile : string = "Fichier contenant le dataset chargé.";
  public errorLoadingFile : string = "Erreur lors du chargement du fichier contenant le dataset.";
  public successLoadingDataSetFile !: string;
  public errorLoadingDataSetFile !: string;

  // Messages de retour - Chargement du DataSet dans la BDD Vectorielle :
  public reponseLoadingDataSetIntoVectorDataBase !: boolean;
  public successLoadingDataSet : string = "DataSet chargé dans la BDD Vectorielle.";
  public errorLoadingDataSet : string = "Erreur lors du chargement du DataSet dans la BDD Vectorielle.";
  public successLoadingDataSetIntoVectorDataBase !: string;
  public errorLoadingDataSetIntoVectorDataBase !: string;

  // Catégories :
  public categoriesList !: string[];
  public selectedCategory !: string;

  // Messages de retour - Sélection de la catégorie :
  public reponseSelectCategory !: boolean;
  public selectCategorySuccess : string = "Catégorie sélectionnée.";
  public selectCategoryError : string = "Erreur lors de la sélection du modèle.";
  public successSelectCategory !: string;
  public errorSelectCategory !: string;

  // Champs du formulaire contenant la question :
  public question !: string;

  // Messages de retour - Réponse du Llm :
  public llmAnswer !: string;
  public displayLlmAnswer !: string;





  /******************************* Constructeur *******************************/
  constructor(private iaService : IaService) { }





  /******************************* Initialisation *******************************/
  ngOnInit(): void {
    this.getListCategories();
  }





  /******************************* Méthodes *******************************/


  /**
   * Méthode qui génère le fichier Jsonl pour charger le DataSet dans la BDD Vectorielle.
   * Par défaut, le DataSet utilisé est celui du Camélia Yvon Jézéquel.
   *
   */
  public generateJsonlFileTemplateForDataset(): void {
    this.iaService.generateJsonlFileTemplateForDataset().subscribe(
      (response: boolean) =>
      {
        this.generationJsonlFile = response;
        console.log(this.generationJsonlFile);
        // Affichage des messages de succès ou d'erreur :
        if (this.generationJsonlFile) {
          this.displaySuccessMessageJsonl = this.successGenerationJsonl;
        } else {
          this.displayErrorMessageJsonl = this.errorFileGenerationJsonl;
        }
      }),
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
  }



  /**
   * Méthode qui intègre les fichier .jsonl
   * dans le modèle de Machine Learning FaceRecognizer.
   *
   */
  public onDataSetFileSelected(event: any): void {
    this.selectedDataSetFile = event.target.files[0] as File;
  }



  /**
   * Méthode pour charger un fichier .jsonl contenant les données chargées dans la BDD Vectorielle.
   *
   */
  public async importJsonlTemplateDataSetFile(): Promise<void> {
    if (this.selectedDataSetFile) {
      try {
        this.reponseLoadingDataSetFile = await this.iaService.importJsonlTemplateDataSetFile(this.selectedDataSetFile);
        console.log(this.reponseLoadingDataSetFile);
        // Affichage des messages de succès ou d'erreur :
        if (this.reponseLoadingDataSetFile) {
          this.successLoadingDataSetFile = this.successLoadingFile;
        } else {
          this.errorLoadingDataSetFile = this.errorLoadingFile;
        }
      } catch (error) {
        console.error('Erreur : ', error);
      }

    }
  }



  /**
   * Méthode qui charge le dataset dans la BDD Vectorielle à partir du fichier .jsonl.
   *
   */
  public async loadFileIntoDataset(): Promise<void> {
    // Exécution de la requête :
    try {
      this.reponseLoadingDataSetIntoVectorDataBase = await this.iaService.loadFileIntoDataset();
      // Affichage des messages de succès ou d'erreur :
      if (this.reponseLoadingDataSetIntoVectorDataBase) {
        this.successLoadingDataSetIntoVectorDataBase = this.successLoadingDataSet;
      } else {
        this.errorLoadingDataSetIntoVectorDataBase = this.errorLoadingDataSet;
      }
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui renvoie la liste des catégories de données (closed_qa, brainstorming, classification, summarization).
   *
   */
  public async getListCategories(): Promise<any>{
    try {
      this.categoriesList = await this.iaService.getListCategories();
      console.log("liste des catégories: "+ this.categoriesList);
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui sélectionne la catgorie de données chargées
   * dans la BDD Vectorielle.
   *
   */
  public async selectCategory(): Promise<any>{
    try {
      console.log("sélection catégorie : "+this.selectedCategory);
      this.reponseSelectCategory = await this.iaService.selectCategory(this.selectedCategory);
      // Affichage des messages de succès ou d'erreur :
      if (this.reponseSelectCategory) {
        this.successSelectCategory = this.selectCategorySuccess;
      } else {
        this.errorSelectCategory = this.selectCategoryError;
      }
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }



  /**
   * Méthode qui interroge le Llm au sujet du dataSet chargé dans la BDD Vectorielle.
   *
   */
  public async getLlmEmbeddingAnswer(): Promise<any>{
    try {
      console.log("*********** TEST ***********")
      console.log(this.question)
      console.log("*********** TEST ***********")
      this.llmAnswer = await this.iaService.getLlmEmbeddingAnswer(this.question);
      console.log(this.llmAnswer);
      if (this.llmAnswer) {
        this.displayLlmAnswer = this.llmAnswer;
      }
    } catch (error) {
      console.error('Erreur : ', error);
    }
  }





}

