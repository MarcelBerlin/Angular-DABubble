import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuChannelsWorkspacesComponent } from './menu-channels-workspaces.component';

describe('MenuChannelsWorkspacesComponent', () => {
  let component: MenuChannelsWorkspacesComponent;
  let fixture: ComponentFixture<MenuChannelsWorkspacesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuChannelsWorkspacesComponent]
    });
    fixture = TestBed.createComponent(MenuChannelsWorkspacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
