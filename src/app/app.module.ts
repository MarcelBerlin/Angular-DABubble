import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './dashboard/header/header.component';
import { MenuChannelsWorkspacesComponent } from './dashboard/menu-channels-workspaces/menu-channels-workspaces.component';
import { MainChatComponent } from './dashboard/main-chat/main-chat.component';
import { SecondaryChatComponent } from './dashboard/secondary-chat/secondary-chat.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { LoginComponent } from './auth-features/login/login.component';
import { FormsModule, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions, } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';


import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderDialogComponent } from './dialog/header-dialog/header-dialog.component';
import { MenuSidenavComponent } from './dashboard/menu-channels-workspaces/menu-sidenav/menu-sidenav.component';
import { MatTreeModule } from '@angular/material/tree';
import { DialogChannelEditionComponent } from './dialog/dialog-channel-edition/dialog-channel-edition.component';
import { HeaderEditDialogComponent } from './dialog/header-edit-dialog/header-edit-dialog.component';
import { DialogInfoComponent } from './dialog/dialog-info/dialog-info.component';
import { ForgotPasswordComponent } from './auth-features/forgot-password/forgot-password.component';
import { DialogAddChannelComponent } from './dialog/dialog-add-channel/dialog-add-channel.component';
import { SecondaryChatHeadComponent } from './dashboard/secondary-chat/secondary-chat-head/secondary-chat-head.component';
import { MainChatMessagefieldComponent } from './dashboard/main-chat/main-chat-messagefield/main-chat-messagefield.component';
import { SecondaryChatMessagefieldComponent } from './dashboard/secondary-chat/secondary-chat-messagefield/secondary-chat-messagefield.component';
import { DialogProfileViewUsersComponent } from './dialog/dialog-profile-view-users/dialog-profile-view-users.component';
import { DialogMembersComponent } from './dialog/dialog-members/dialog-members.component';
import { DialogAddMembersComponent } from './dialog/dialog-add-members/dialog-add-members.component';
import { CreateAccountComponent } from './auth-features/create-account/create-account.component';
import { StartAnimationComponent } from './auth-features/start-animation/start-animation.component';
import { MainChatChannelHeadComponent } from './dashboard/main-chat/main-chat-head/main-chat-channel-head/main-chat-channel-head.component';
import { MainChatMessageHeadComponent } from './dashboard/main-chat/main-chat-head/main-chat-message-head/main-chat-message-head.component';
import { MainChatChannelChatFieldComponent } from './dashboard/main-chat/main-chat-chatfield/main-chat-channel-chat-field/main-chat-channel-chat-field.component';
import { ConversationBetweenComponent } from './dashboard/main-chat/main-chat-chatfield/main-chat-message-chat-field/conversation-between/conversation-between.component';
import { MainChatHeadComponent } from './dashboard/main-chat/main-chat-head/main-chat-head.component';
import { MainChatChatfieldComponent } from './dashboard/main-chat/main-chat-chatfield/main-chat-chatfield.component';
import { MainChatMultiMessageHeadComponent } from './dashboard/main-chat/main-chat-head/main-chat-multi-message-head/main-chat-multi-message-head.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ChannelSelectionComponent } from './dashboard/main-chat/main-chat-chatfield/main-chat-channel-chat-field/channel-selection/channel-selection.component';
import { LoginHeaderComponent } from './auth-features/login-header/login-header.component';
import { SecondaryChatInputfieldComponent } from './dashboard/secondary-chat/secondary-chat-inputfield/secondary-chat-inputfield.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { DialogUserReactionsComponent } from './dialog/dialog-user-reactions/dialog-user-reactions.component';
import { DirectChatComponent } from './direct-chat/direct-chat.component';
import { HttpClientModule } from '@angular/common/http';
import { EmojiPickerBossiComponent } from './emoji-picker-bossi/emoji-picker-bossi.component';
import { ImprintDataProtectionComponent } from './auth-features/login/imprint-data-protection/imprint-data-protection.component';
import { UploadComponent } from './file-upload/upload/upload.component';
import { DialogUploadComponent } from './file-upload/dialog-upload/dialog-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuChannelsWorkspacesComponent,
    MainChatComponent,
    SecondaryChatComponent,
    LoginComponent,
    DashboardComponent,
    HeaderDialogComponent,
    MenuSidenavComponent,
    DialogChannelEditionComponent,
    HeaderEditDialogComponent,
    DialogInfoComponent,
    ForgotPasswordComponent,
    DialogAddChannelComponent,
    SecondaryChatHeadComponent,
    MainChatMessagefieldComponent,
    SecondaryChatMessagefieldComponent,
    DialogProfileViewUsersComponent,
    DialogMembersComponent,
    DialogAddMembersComponent,
    CreateAccountComponent,
    StartAnimationComponent,
    MainChatChannelHeadComponent,
    MainChatMessageHeadComponent,
    MainChatChannelChatFieldComponent,
    ConversationBetweenComponent,
    MainChatHeadComponent,
    MainChatChatfieldComponent,
    MainChatMultiMessageHeadComponent,
    ChannelSelectionComponent,
    LoginHeaderComponent,
    SecondaryChatInputfieldComponent,
    DialogUserReactionsComponent,
    DirectChatComponent,
    EmojiPickerBossiComponent,
    ImprintDataProtectionComponent,
    UploadComponent,
    DialogUploadComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatMenuModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatAutocompleteModule,
    PickerModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})

export class AppModule { }
