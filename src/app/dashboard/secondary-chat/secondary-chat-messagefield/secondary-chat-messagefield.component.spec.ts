import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryChatMessagefieldComponent } from './secondary-chat-messagefield.component';

describe('SecondaryChatMessagefieldComponent', () => {
  let component: SecondaryChatMessagefieldComponent;
  let fixture: ComponentFixture<SecondaryChatMessagefieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondaryChatMessagefieldComponent]
    });
    fixture = TestBed.createComponent(SecondaryChatMessagefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
