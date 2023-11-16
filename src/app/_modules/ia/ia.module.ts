import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatGptBotComponent } from './chat-gpt-bot/chat-gpt-bot.component';
import { IARoutingModule } from "./ia-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ListIaComponent } from './list-ia/list-ia.component';
import { IrisModelComponent } from './iris-model/iris-model.component';




/******************************* Module d'implémentation des IA *******************************/
@NgModule({
  declarations: [
    ChatGptBotComponent,
    ListIaComponent,
    IrisModelComponent
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

