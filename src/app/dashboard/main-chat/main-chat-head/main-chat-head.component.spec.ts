import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainChatHeadComponent } from './main-chat-head.component';

describe('MainChatHeadComponent', () => {
  let component: MainChatHeadComponent;
  let fixture: ComponentFixture<MainChatHeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainChatHeadComponent]
    });
    fixture = TestBed.createComponent(MainChatHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
