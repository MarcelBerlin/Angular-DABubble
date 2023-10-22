import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsivViewSearchbarComponent } from './responsiv-view-searchbar.component';

describe('ResponsivViewSearchbarComponent', () => {
  let component: ResponsivViewSearchbarComponent;
  let fixture: ComponentFixture<ResponsivViewSearchbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsivViewSearchbarComponent]
    });
    fixture = TestBed.createComponent(ResponsivViewSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
