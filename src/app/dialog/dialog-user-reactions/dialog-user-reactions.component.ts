import { Component } from '@angular/core';
import { SecondaryChatMessagefieldComponent } from 'src/app/dashboard/secondary-chat/secondary-chat-messagefield/secondary-chat-messagefield.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dialog-user-reactions',
  templateUrl: './dialog-user-reactions.component.html',
  styleUrls: ['./dialog-user-reactions.component.scss']
})
export class DialogUserReactionsComponent {

  constructor(public getUser: DataService) { }
}
