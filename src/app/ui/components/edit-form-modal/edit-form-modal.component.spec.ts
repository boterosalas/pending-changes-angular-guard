import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormModalComponent } from './edit-form-modal.component';

describe('EditFormModalComponent', () => {
  let component: EditFormModalComponent;
  let fixture: ComponentFixture<EditFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFormModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
