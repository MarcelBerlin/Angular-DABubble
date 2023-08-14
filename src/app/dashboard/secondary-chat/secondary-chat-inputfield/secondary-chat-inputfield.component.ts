import { Component, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('uploadInput') uploadInput: ElementRef<HTMLInputElement>;

  textarea: any = '';

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
    // console.log(this.dataService.userData[this.varService.selectedChannel].name);
    
    // this.dataService.userData[this.varService.selectedChannel].name
    
  }
}
