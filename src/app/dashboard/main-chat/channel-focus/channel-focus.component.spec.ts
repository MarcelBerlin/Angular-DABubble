import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelFocusComponent } from './channel-focus.component';

describe('ChannelFocusComponent', () => {
  let component: ChannelFocusComponent;
  let fixture: ComponentFixture<ChannelFocusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChannelFocusComponent]
    });
    fixture = TestBed.createComponent(ChannelFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
