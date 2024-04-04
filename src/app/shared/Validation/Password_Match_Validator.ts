import { AbstractControl, ValidationErrors } from "@angular/forms";

export const PasswordsMatchValidator = (passwordControlName: string, confirmPasswordControlName: string) => {
    return (form: AbstractControl): ValidationErrors | null => {
        const passwordControl = form.get(passwordControlName);
        const confirmPasswordControl = form.get(confirmPasswordControlName);

        if (!passwordControl || !confirmPasswordControl) {
            return null;
        }

        if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ notMatch: true });
            return { notMatch: true };
        } else {
            const errors = confirmPasswordControl.errors;
            if (!errors) {
                return null;
            }
            delete errors["notMatch"];
            confirmPasswordControl.setErrors(Object.keys(errors).length ? errors : null);
            return null;
        }
    };
};





// import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//     const password = control.get('password');
//     const confirmPassword = control.get('confirmPassword');

//     if (!password || !confirmPassword) {
//         return null;
//     }

//     return password.value === confirmPassword.value ? null : { passwordsNotMatch: true };
// };


 