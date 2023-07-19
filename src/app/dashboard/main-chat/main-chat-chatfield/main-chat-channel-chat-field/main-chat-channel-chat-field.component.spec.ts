import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainChatChannelChatFieldComponent } from './main-chat-channel-chat-field.component';

describe('MainChatChannelChatFieldComponent', () => {
  let component: MainChatChannelChatFieldComponent;
  let fixture: ComponentFixture<MainChatChannelChatFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainChatChannelChatFieldComponent]
    });
    fixture = TestBed.createComponent(MainChatChannelChatFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
