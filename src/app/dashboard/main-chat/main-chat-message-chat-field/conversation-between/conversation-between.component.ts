import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { DialogProfileViewUsersComponent } from 'src/app/dialog/dialog-profile-view-users/dialog-profile-view-users.component';
import { DataService } from 'src/app/services/data.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-conversation-between',
  templateUrl: './conversation-between.component.html',
  styleUrls: ['./conversation-between.component.scss']
})
export class ConversationBetweenComponent {
  infoTextNr: number;

  message = [
    {
      text1: `Diese Unterhaltung findet nur zwischen `,
      text2: ` und dir statt.`,
    },
    {
      text1: `Dieser Raum ist nur für dich da. Mache dir Notizen, liste deine To-dos auf oder bewahre Links und Dateien griffbereit auf. Du kannst hier auch gerne Dinge mit dir selbst besprechen.`,
    },
  ];

  constructor(
    public dataService: DataService,
    public varService: VariablesService,
    private dialog: Dialog
  ) {}

  profilView() {
    this.varService.setVar(
      'selectedUserDetailView',
      this.varService.selectedUserToMessage
    );
    this.dialog.open(DialogProfileViewUsersComponent);
  }

  currentUser() {
    return (
      this.dataService.loggedInUserData.email ===
      this.dataService.userData[this.varService.selectedUserToMessage].email
    );
  }

  numberQuery() {
    return this.currentUser() ? 1 : 0;   
  }

}
