import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhotoURLModalComponent } from './edit-photo-url-modal.component';

describe('EditPhotoUrlModalComponent', () => {
  let component: EditPhotoURLModalComponent;
  let fixture: ComponentFixture<EditPhotoURLModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPhotoURLModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhotoURLModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
