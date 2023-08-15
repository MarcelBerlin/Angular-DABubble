import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprintDataProtectionComponent } from './imprint-data-protection.component';

describe('ImprintDataProtectionComponent', () => {
  let component: ImprintDataProtectionComponent;
  let fixture: ComponentFixture<ImprintDataProtectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImprintDataProtectionComponent]
    });
    fixture = TestBed.createComponent(ImprintDataProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
