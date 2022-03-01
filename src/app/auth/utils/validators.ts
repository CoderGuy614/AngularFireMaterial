// import { getAllDates } from 'src/app/shared/helpers';
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

// export function dateRangeIsAvailable(product: Product): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const checkIn = getDateControlValue(control, 'checkIn');
//     const checkOut = getDateControlValue(control, 'checkOut');
//     const bookedDates = getAllDates(product);
//     let invalid = false;
//     bookedDates.forEach((date) => {
//       if (moment(date).isBetween(checkIn, checkOut)) {
//         invalid = true;
//       }
//     });
//     return invalid ? { dateRangeNotAvailable: true } : null;
//   };
// }

export function minStayLength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const checkIn = getDateControlValue(control, 'checkIn');
    const checkOut = getDateControlValue(control, 'checkOut');
    if (checkIn == checkOut) {
      return { minLength: true };
    }
  };
}

// export function minStayLength(form: FormGroup): ValidationErrors | null {
//   return form.get('checkIn').value === form.get('checkOut').value
//     ? { minLength: true }
//     : null;
// }

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

function getDateControlValue(control: AbstractControl, name: string): string {
  return moment(control.get(name).value).format('YYYY-MM-DD');
}
