import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingConfirmationModalComponent } from './booking-confirmation-modal.component';

describe('BookingConfirmationModalComponent', () => {
  let component: BookingConfirmationModalComponent;
  let fixture: ComponentFixture<BookingConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingConfirmationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
