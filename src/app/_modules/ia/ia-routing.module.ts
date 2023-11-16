import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatGptBotComponent } from "./chat-gpt-bot/chat-gpt-bot.component";
import {ListIaComponent} from "./list-ia/list-ia.component";
import {IrisModelComponent} from "./iris-model/iris-model.component";




/******************************* Routes *******************************/
const routes: Routes = [
  { path: 'chat-bot', component: ChatGptBotComponent },
  { path: 'liste-ia', component: ListIaComponent },
  { path: 'iris', component: IrisModelComponent },
];




/******************************* Module de Routage *******************************/
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IARoutingModule { }
