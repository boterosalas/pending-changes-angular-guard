import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmExitDialogComponent } from './confirm-exit-dialog.component';

describe('ConfirmExitDialogComponent', () => {
  let component: ConfirmExitDialogComponent;
  let fixture: ComponentFixture<ConfirmExitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmExitDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmExitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
