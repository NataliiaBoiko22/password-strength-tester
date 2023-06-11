import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-password-strength-tester',
  templateUrl: './password-strength-tester.component.html',
  styleUrls: ['./password-strength-tester.component.scss'],
})
export class PasswordStrengthTesterComponent {
  constructor(private fb: FormBuilder, private toastr: ToastrService) {}

  passwordIsValid = false;
  form = this.fb.group({
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.form.valid) {
      this.toastr.success('Form Submitted', 'Success');
    } else {
      this.toastr.error('Form values are invalid.', 'Error');
    }
  }

  passwordValid(event: boolean) {
    this.passwordIsValid = event;
  }
}
