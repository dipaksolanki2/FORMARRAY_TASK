import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {

      // console.log(this.signupForm.value);

      this.authService.onSignUp(this.signupForm.value).subscribe(
        (response) => {
          if(response.error) {
            console.log(response.error);
            this.snackBar.open(response.error, 'Close', {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 3000
            });
          }
          else {
            // console.log('User registered successfully:', response);
            this.snackBar.open('User registered successfully', "close", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 3000
            });
            this.router.navigate(['/login'])
            this.signupForm.reset();
          }
        },
        (error) => {
          // console.error('Error while user registration!', error);
          this.snackBar.open('Error while user registration!', "close", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 3000
          });
        }
      )
    }
  }

  hide: boolean = true
  togglePasswordVisibility(): void {
    this.hide = !this.hide
  }
}
