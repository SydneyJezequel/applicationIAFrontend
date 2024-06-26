import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatGptBotComponent } from "./chat-gpt-bot/chat-gpt-bot.component";
import { ListIaComponent } from "./list-ia/list-ia.component";
import { IrisModelComponent } from "./iris-model/iris-model.component";
import { IrisModelResultsComponent } from "./iris-model-results/iris-model-results.component";
import { IrisModelNewDatasetComponent } from "./iris-model-new-dataset/iris-model-new-dataset.component";
import { FaceRecognizerModelComponent } from "./face-recognizer-model/face-recognizer-model.component";
import { GanModelComponent } from "./gan-model/gan-model.component";
import { EmbeddingDatabaseComponent } from "./embedding-database/embedding-database.component";
import {LlmModelComponent} from "./llm-model/llm-model.component";






/******************************* Routes *******************************/
const routes: Routes = [
  { path: 'chat-bot', component: ChatGptBotComponent },
  { path: 'ia-list', component: ListIaComponent },
  { path: 'iris', component: IrisModelComponent },
  { path: 'result-iris', component: IrisModelResultsComponent},
  { path: 'new-dataset', component: IrisModelNewDatasetComponent},
  { path: 'reconnaissance-faciale', component: FaceRecognizerModelComponent},
  { path: 'gan-model', component: GanModelComponent},
  { path: 'embedding', component: EmbeddingDatabaseComponent},
  { path: 'llm-model', component: LlmModelComponent}
];






/******************************* Module de Routage *******************************/
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IARoutingModule { }

