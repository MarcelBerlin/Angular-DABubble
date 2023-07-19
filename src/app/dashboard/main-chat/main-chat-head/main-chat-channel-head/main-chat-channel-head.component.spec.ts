import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainChatChannelHeadComponent } from './main-chat-channel-head.component';

describe('MainChatChannelHeadComponent', () => {
  let component: MainChatChannelHeadComponent;
  let fixture: ComponentFixture<MainChatChannelHeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainChatChannelHeadComponent]
    });
    fixture = TestBed.createComponent(MainChatChannelHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
