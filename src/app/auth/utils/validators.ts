import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";


export function passwordsMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pass1 = control.get('password');
      const pass2 = control.get('confirmPassword');
      const noMatch = pass1.value !== pass2.value;
      return noMatch ? {passwordsDontMatch: true } : null;
    };
  };

export function dateRangeIsAvailable(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const  checkIn = control.get('checkIn');
    const checkOut = control.get('checkOut');
    console.log(checkIn, checkOut, "DATE RANGE VALIDATOR");
    return { dateRangeNotAvailable: true }
  }
}


export function validateAllFormFields(formGroup: FormGroup) {         
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);             
    if (control instanceof FormControl) {             
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {        
      this.validateAllFormFields(control);           
    }
  });
};

export function isFieldValid(field: string, form: FormGroup) {
  return !form.get(field).valid && form.get(field).touched;
};

  