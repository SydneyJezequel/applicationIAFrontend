

/******************************* Entité Personne *******************************/
export class Personne {
  no_personne!: number;
  nom!: string;
  prenom!: string;
  date_naissance!: Date;
  no_securite_sociale!: number;
  photo!: number[]; // Le type File définit le fichier image
}

