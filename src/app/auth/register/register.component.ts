import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private toastService: ToastService) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password && confirmPassword && password !== confirmPassword) {
    return { notMatching: true };  // This sets the error when passwords don't match
  }
  return null;
}

  async onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      (await this.authService.register(this.registerForm.value)).subscribe(
        (response: any) => {
          if(response.success) {
            this.toastService.success('Registration successful');
            console.log(response);
            this.router.navigate(['/home']);
          }
          if (!response.success) {
            this.toastService.error(response.message);
          }
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
}
