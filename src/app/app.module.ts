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
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions, } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MainChatHeadComponent } from './dashboard/main-chat/main-chat-head/main-chat-head.component';
import { MainChatTimeSeparatorComponent } from './dashboard/main-chat/main-chat-time-separator/main-chat-time-separator.component';
import { HeaderDialogComponent } from './header-dialog/header-dialog.component';
import { MenuSidenavComponent } from './dashboard/menu-channels-workspaces/menu-sidenav/menu-sidenav.component';
import { MatTreeModule } from '@angular/material/tree';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuChannelsWorkspacesComponent,
    MainChatComponent,
    SecondaryChatComponent,
    LoginComponent,
    DashboardComponent,
    MainChatHeadComponent,
    MainChatTimeSeparatorComponent,
    HeaderDialogComponent,
    MenuSidenavComponent,

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
    ReactiveFormsModule,
    MatTreeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})

export class AppModule { }
