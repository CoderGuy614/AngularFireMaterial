import { getAllDates } from 'src/app/shared/helpers';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import * as moment from 'moment';
import { Product } from 'src/app/models/Product';

export function passwordsMatch(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pass1 = control.get('password');
    const pass2 = control.get('confirmPassword');
    const noMatch = pass1.value !== pass2.value;
    return noMatch ? { passwordsDontMatch: true } : null;
  };
}

export function dateRangeIsAvailable(product: Product): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const checkIn = moment(control.get('checkIn').value).format('YYYY-MM-DD');
    const checkOut = moment(control.get('checkOut').value).format('YYYY-MM-DD');
    const allProductDates = getAllDates(product);
    let invalid = false;
    allProductDates.forEach((date) => {
      if (moment(date).isBetween(checkIn, checkOut)) {
        invalid = true;
      }
    });
    return invalid ? { dateRangeNotAvailable: true } : null;
  };
}

export function validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach((field) => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
}

export function isFieldValid(field: string, form: FormGroup) {
  return !form.get(field).valid && form.get(field).touched;
}
