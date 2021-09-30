import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDisplayNameModalComponent } from './edit-display-name-modal.component';

describe('EditDisplayNameModalComponent', () => {
  let component: EditDisplayNameModalComponent;
  let fixture: ComponentFixture<EditDisplayNameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDisplayNameModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDisplayNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
