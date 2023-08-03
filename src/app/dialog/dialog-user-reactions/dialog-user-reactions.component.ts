import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { SecondaryChatMessagefieldComponent } from 'src/app/dashboard/secondary-chat/secondary-chat-messagefield/secondary-chat-messagefield.component';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-dialog-user-reactions',
  templateUrl: './dialog-user-reactions.component.html',
  styleUrls: ['./dialog-user-reactions.component.scss']
})


export class DialogUserReactionsComponent {

   @Input() dialogEmoji: any[];

  constructor(public getUser: DataService,
    public messages: MessageService,
    public thread: SecondaryChatMessagefieldComponent,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // debugger;
    // console.log(this.dialogEmoji);
  }
}
