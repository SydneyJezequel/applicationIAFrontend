import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatGptBotComponent } from './chat-gpt-bot/chat-gpt-bot.component';
import { IARoutingModule } from "./ia-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ListIaComponent } from './list-ia/list-ia.component';
import { IrisModelComponent } from './iris-model/iris-model.component';
import { IrisModelResultsComponent } from './iris-model-results/iris-model-results.component';
import { IrisModelNewDatasetComponent } from './iris-model-new-dataset/iris-model-new-dataset.component';
import { FaceRecognizerModelComponent } from './face-recognizer-model/face-recognizer-model.component';
import { GanModelComponent } from './gan-model/gan-model.component';
import { EmbeddingDatabaseComponent } from './embedding-database/embedding-database.component';
import { LlmModelComponent } from './llm-model/llm-model.component';






/******************************* Module d'implémentation des IA *******************************/
@NgModule({
  declarations: [
    ChatGptBotComponent,
    ListIaComponent,
    IrisModelComponent,
    IrisModelResultsComponent,
    IrisModelNewDatasetComponent,
    FaceRecognizerModelComponent,
    GanModelComponent,
    EmbeddingDatabaseComponent,
    LlmModelComponent
  ],
  imports: [
    CommonModule,
    IARoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class IAModule { }

