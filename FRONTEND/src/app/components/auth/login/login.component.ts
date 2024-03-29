import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {

      // console.log(this.loginForm.value);

      this.authService.onLogin(this.loginForm.value).subscribe(
        (response) => {

          if(response.error) {
            console.log(response.error);
            this.snackBar.open(response.error, 'close', {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 3000,
            })
          }

          else {
            localStorage.setItem('token', response.token);
            // console.log('User Logged in successfully:', response);
            this.snackBar.open('User Logged in successfully', "close", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 3000,
            });
            this.router.navigate(['/school'])
            this.loginForm.reset()
            location.reload()
          }

        },
        (error) => {
          // console.error('Error while logging!', error);
          this.snackBar.open('Error while logging!', "close", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 3000,
          });
          this.router.navigate(['/login'])
        }
      )
      // alert(`Welcome to ${this.loginForm.value.email}`)
      
    }

  }

  hide: boolean = true
  togglePasswordVisibility(): void {
    this.hide = !this.hide
  }
  
}
