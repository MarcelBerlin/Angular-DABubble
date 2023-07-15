import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainChatMessagefieldComponent } from './main-chat-messagefield.component';

describe('MainChatMessagefieldComponent', () => {
  let component: MainChatMessagefieldComponent;
  let fixture: ComponentFixture<MainChatMessagefieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainChatMessagefieldComponent]
    });
    fixture = TestBed.createComponent(MainChatMessagefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
