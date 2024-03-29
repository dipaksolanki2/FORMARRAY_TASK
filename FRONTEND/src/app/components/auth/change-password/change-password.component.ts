import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  resetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  token: string = localStorage.getItem('token');
  msg: string = "Password reset successful"
  isReset: boolean = false;
  resetPassword() {
    if (this.resetPasswordForm.valid) {

      // const oldPassword = this.resetPasswordForm.get('oldPassword').value;
      // const newPassword = this.resetPasswordForm.get('newPassword').value;

      const { oldPassword, newPassword } = this.resetPasswordForm.value
      
      if (!this.token) {
        // console.error('Token is missing');
        this.snackBar.open('Token is missing', "close", {
          horizontalPosition: "center",
          verticalPosition: "top",
        });
        return;
      }
      // console.log(this.token);
      
      this.authService.resetPassword(this.token, oldPassword, newPassword)
        .subscribe(
          (response): any => {

            if(response.message) {
              console.log(response.message);
              this.snackBar.open(response.message, "close", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000
              });
              this.resetPasswordForm.reset();
            }

            if(response.message == this.msg) {
              localStorage.removeItem('token')          
              return this.isReset = true;         
            }
            // return false  
            
          },
          error => {
            // console.error('Failed to reset password:', error);
            this.snackBar.open('Failed to reset password', "close", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 3000
            });
          }
        );

    }
  }
  
}
