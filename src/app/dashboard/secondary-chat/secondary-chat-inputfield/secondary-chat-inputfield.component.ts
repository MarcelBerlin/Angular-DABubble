import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { MessageService } from 'src/app/services/messages.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-secondary-chat-inputfield',
  templateUrl: './secondary-chat-inputfield.component.html',
  styleUrls: ['./secondary-chat-inputfield.component.scss']
})
export class SecondaryChatInputfieldComponent {

  textarea: string; // ngModel
  userForm = new FormControl('');
  name: string = 'name';
  options: '';
  channel = 'aktueller Channel'
  user = 'alle user im channel'
  filteredOptions: Observable<string[]>;

  specificChannel: string = '';
  directMessage: string = '';
  loggedUser: string = '';
  searchField: string = '';

  constructor(public varService: VariablesService,
    public dataService: DataService,
    public dialogAddService: DialogAddService,
    public messageService: MessageService,
    public chatService: ChatService,
  ) { }

  ngOnInit() {
    // this.filteredOptions = this.userForm.valueChanges.pipe(
    //   map((value) => this._filter(value || ''))
    // );
  }


  sendMessage() {
    console.log('senden funktioniert noch nicht');
  }


  markUser() {
    // console.log(this.dataService.userData[this.varService.selectedChannel].name);
    this.textarea = '@'
    // this.dataService.userData[this.varService.selectedChannel].name
    
  }

  // displayFn(user: User): string {
  //   return user && user.name ? user.name : '';
  // }

  // private _filter(name: string): User[] {
  //   const filterValue = name.toLowerCase();

  //   return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  // }
}
