import { Component, Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-dialog-user-reactions',
  templateUrl: './dialog-user-reactions.component.html',
  styleUrls: ['./dialog-user-reactions.component.scss']
})


export class DialogUserReactionsComponent {

  constructor(public getUser: DataService,
    public app: AppComponent,
    public messages: MessageService) 
    {
    
    setTimeout(() => console.log(app.newReaction), 1000);
  }
}
