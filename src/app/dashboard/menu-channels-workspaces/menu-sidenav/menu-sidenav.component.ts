import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from 'src/app/dialog-add-channel/dialog-add-channel.component';
import { DialogAddService } from 'src/app/services/dialog-add.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/models/user.class';
import { VariablesService } from 'src/app/services/variables.service';

interface Tag {
  id: string;
  name: string;
  imagePath: string;
  description: string;
}

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss'],
  animations: [
    trigger('tagAnimation', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0, display: 'none' })),
      transition('visible <=> hidden', animate('175ms ease-in-out'))
    ])
  ]
})

export class MenuSidenavComponent implements OnInit {

  
  tags$: Observable<any[]>;
  user$: Observable<any[]>;
  userData: any;  
  tags: any;
  tagState = 'visible';

  newMessagePath: string = 'assets/img/sidenav/newMessage.png';
  channelsPath: string = 'assets/img/sidenav/channel_closed.png';
  addPathChannel: string = 'assets/img/sidenav/add.png';
  addPathMessage: string = 'assets/img/sidenav/add.png';
  addNewChannel: string = 'assets/img/sidenav/add_Channel.png';
  firstTagPath: string = 'assets/img/sidenav/tag.png';
  secondTagPath: string = 'assets/img/sidenav/tag.png';
  thirdTagPath: string = 'assets/img/sidenav/tag.png';
  directMessagePath: string = 'assets/img/sidenav/direct_message_closed.png';

  channelsVisible: boolean = true;
  directMessageUserVisible: boolean = true;


  constructor(public dialog: MatDialog, public getService: DialogAddService, private firestore: Firestore, public getUserData: DataService,public varService:VariablesService) {
    this.tags = this.getService.tags;
    this.userData = this.getUserData.userData;
  }

  ngOnInit(): void {

    this.allTags();
    this.allUsers();

  }


  allTags() {
    const tagCollection = collection(this.firestore, 'tags');
    this.tags$ = collectionData(tagCollection, { idField: 'id' });

    this.tags$.subscribe(data => {
      this.tags = data;
    });
  }

  allUsers() {
    const userCollection = collection(this.firestore, 'users');
    this.user$ = collectionData(userCollection, { idField: 'id' });

    this.user$.subscribe(data => {
      this.userData = data;      
      
    });
  }

  toggleChannels() {
    this.channelsVisible = !this.channelsVisible;
  }

  toggleDirectMessage() {
    this.directMessageUserVisible = !this.directMessageUserVisible;
  }

  addChannel() {
    this.dialog.open(DialogAddChannelComponent)
  }

  deleteTag(tag: Tag) {
    // Löschen des Tags aus der HTML-Ansicht
    this.getService.tags = this.getService.tags.filter(t => t !== tag);

    // Löschen des Tags aus der Firestore-Datenbank
    this.getService.deleteTagFromFirestore(tag);
  }

  messageToUser() {
    this.varService.setVar('messagePNBox', true)
  }

  openChannel() {
    this.varService.setVar('messagePNBox', false)

  }
}
