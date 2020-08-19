import { AbstractControl, Validators, ValidationErrors, FormArray } from "@angular/forms";

export class CustomValidators {

    static groupValidator(formArray: FormArray): ValidationErrors | null {
        const callerFormControl: AbstractControl = formArray.controls[0];
        const callerFormControlHasValue: boolean = Validators.required(callerFormControl) == null;

        for (const calledFormControl of formArray.controls) {
            const calledFormControlHasValue: boolean = Validators.required(calledFormControl) == null;

            if (callerFormControlHasValue && !calledFormControlHasValue)
                return { invalidControls: true };

            if (!callerFormControlHasValue && calledFormControlHasValue)
                return { invalidControls: true };
        }

        return null;
    }

}