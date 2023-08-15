import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { MessageService } from 'src/app/services/messages.service';
import { VariablesService } from 'src/app/services/variables.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { User } from 'src/app/models/user.class';

@Component({
  selector: 'app-secondary-chat-inputfield',
  templateUrl: './secondary-chat-inputfield.component.html',
  styleUrls: ['./secondary-chat-inputfield.component.scss']
})
export class SecondaryChatInputfieldComponent {

  @ViewChild('uploadInput') uploadInput: ElementRef<HTMLInputElement>;

  textarea: any = '';
  showUsers: boolean = true;
  formcontrol = new FormControl('');

  // users = this.dataService.userData[this.varService.selectedChannel];
  users = ['Sonja', 'Waldi', 'Hugo', 'Irmtraud'];

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

  // filterUser(value: string) {
  //   this.filteredOptions = this.formcontrol.valueChanges.pipe(
  //     startWith(''),
  //     map(value => {
  //       const name = typeof value === 'string' ? value : value;
  //       return name ? this._filter(name as string) : this.users.slice();
  //     }),
  //   );
  // }

  // private _filter(name: string): User[] {
  //   const filterValue = name.toLowerCase();

  //   return this.users.filter(option => this.users.toLowerCase().includes(filterValue));
  // }


  showAutocomplete() {
    this.showUsers = !this.showUsers;
  }


  triggerInput() {
    this.uploadInput.nativeElement.click();
  }


  getInputDatas(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      console.log(file.type);
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        this.textarea = e.target.result;
      console.log(e.target.result);

      };
      reader.readAsDataURL(file);
      // console.log(file);
    }
  }


  markUser() {
    // this.textarea = '@'+ this.dataService.userData[this.varService.selectedChannel].name;
    
    // this.dataService.userData[this.varService.selectedChannel].name
  }
}
