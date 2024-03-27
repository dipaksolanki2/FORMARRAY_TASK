import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {

      // console.log(this.loginForm.value);

      this.authService.onLogin(this.loginForm.value).subscribe(
        (response) => {

          if(response.error) {
            console.log(response.error);
          }

          else {
            localStorage.setItem('token', response.token);
            console.log('User Logged in successfully:', response);
            this.router.navigate(['/school'])
            this.loginForm.reset()
          }

        },
        (error) => {
          console.error('Error while logging!', error);
          this.router.navigate(['/login'])
        }
      )
    }
  }

  
}
