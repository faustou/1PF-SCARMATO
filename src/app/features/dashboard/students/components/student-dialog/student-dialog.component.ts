import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Students } from '../../models';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss']
})
export class StudentDialogComponent {
  alumnoForm: FormGroup;

  constructor(private fb: FormBuilder,
              private matDialogRef: MatDialogRef<StudentDialogComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public editingStudents?: Students) {
    this.alumnoForm = this.fb.group({
      name: [null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        this.minLengthValidator(3)
      ]],
      lastName: [null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        this.minLengthValidator(3)
      ]],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });

    if (this.editingStudents) {
      this.alumnoForm.patchValue(this.editingStudents);
    }
  }
  minLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && control.value.trim().length < minLength) {
        return { 'minlength': { requiredLength: minLength, actualLength: control.value.trim().length } };
      }
      return null;
    };
  }

  get nameControl(): AbstractControl {
    return this.alumnoForm.get('name')!;
  }

  get lastNameControl(): AbstractControl {
    return this.alumnoForm.get('lastName')!;
  }

  onSubmit(): void {
    if (this.alumnoForm.valid) {
      this.matDialogRef.close(this.alumnoForm.value);
      this.snackBar.open('Formulario enviado correctamente', 'Cerrar', {
        duration: 3000,
      });
    } else {
      this.snackBar.open('El formulario es inválido', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}
