import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowActionsComponent } from './window-actions.component';

describe('WindowActionsComponent', () => {
  let component: WindowActionsComponent;
  let fixture: ComponentFixture<WindowActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WindowActionsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
