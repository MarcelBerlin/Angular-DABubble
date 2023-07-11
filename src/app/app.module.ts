import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MenuChannelsWorkspacesComponent } from './menu-channels-workspaces/menu-channels-workspaces.component';
import { MainChatComponent } from './main-chat/main-chat.component';
import { SecondaryChatComponent } from './secondary-chat/secondary-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuChannelsWorkspacesComponent,
    MainChatComponent,
    SecondaryChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
