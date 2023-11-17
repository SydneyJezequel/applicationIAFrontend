

/******************************* Entité qui représente le résultat du modèle de machine Learning Iris *******************************/
export class IrisModelResponse {
  sepal_length !: number;
  sepal_width !: number;
  petal_length !: number;
  petal_width !: number;
  prediction !: string | undefined;

}

