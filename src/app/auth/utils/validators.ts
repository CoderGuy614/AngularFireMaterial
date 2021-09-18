import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function passwordsMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pass1 = control.get('password');
      const pass2 = control.get('confirmPassword');
      const noMatch = pass1.value !== pass2.value;
      return noMatch ? {passwordsDontMatch: true } : null;
    };
  };


  