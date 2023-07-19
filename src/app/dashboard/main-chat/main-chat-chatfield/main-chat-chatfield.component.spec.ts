import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainChatChatfieldComponent } from './main-chat-chatfield.component';

describe('MainChatChatfieldComponent', () => {
  let component: MainChatChatfieldComponent;
  let fixture: ComponentFixture<MainChatChatfieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainChatChatfieldComponent]
    });
    fixture = TestBed.createComponent(MainChatChatfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
